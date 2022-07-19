// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { promises as fs } from 'node:fs';

type Data = any;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const text = await fs.readFile('pages/_sidebar.mdx');
  res.setHeader('cache-control', 'max-age=300');
  res.end(text);
}
