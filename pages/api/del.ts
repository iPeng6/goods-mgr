// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { createRouter } from 'next-connect';
import { Goods } from '../../types';
import DB from '../../utils/db';
import fs2Json from '../../utils/fs2Json';

const router = createRouter<NextApiRequest, NextApiResponse>();

router.post((req, res) => {
  console.log('req.body', req.body);
  if (req.body && req.body.category && req.body.id) {
    const { category, id } = req.body;
    const dir = category.replace(/-/g, '/');
    const db = new DB<Goods>(dir);
    db.delete(id);
    res.status(200).json({ status: { code: 0, msg: 'ok' } });
  }
  res.status(400);
});

export default router.handler();
