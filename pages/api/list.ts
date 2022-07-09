// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { createRouter } from 'next-connect';
import fs2Json from '../../utils/fs2Json';

const router = createRouter<NextApiRequest, NextApiResponse>();

router.get((req, res) => {
  const json = fs2Json();
  res.status(200).json(json);
});

export default router.handler();
