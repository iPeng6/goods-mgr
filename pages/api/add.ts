// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import DB from '../../utils/db';
import { createRouter } from 'next-connect';
import { Goods } from '../../types';

const router = createRouter<NextApiRequest, NextApiResponse>();

router.post((req, res) => {
  console.log('req.body', req.body);
  // const db = new DB()
  if (req.body && req.body.category && req.body.filename) {
    const { category, description, filename } = req.body;
    const dir = category.replace(/-/g, '/');
    const db = new DB<Goods>(dir);
    db.add({ category, description, filename });
    res.status(200).json({ status: { code: 0, msg: 'ok' } });
  }
  res.status(400);
});

export default router.handler();
