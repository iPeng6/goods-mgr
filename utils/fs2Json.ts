import fs from 'fs-extra';
import path from 'path';
import { Goods } from '../types';

const root = path.resolve('./public/db/');
function fs2Json() {
  const tree = {};
  const list: Goods[][] = [];
  function readDir(dir: string, res) {
    const files = fs.readdirSync(dir);
    res.child = [];
    files.forEach((item) => {
      const fullpath = path.join(dir, item);
      const stats = fs.statSync(fullpath);
      if (stats.isDirectory()) {
        const obj = {};
        readDir(fullpath, obj);
        res.name = item;
        res.child.push(obj);
      } else {
        const data = fs.readJSONSync(fullpath);
        res.data = data;
        list.push(data);
      }
    });
  }
  readDir(root, tree);

  return { tree, list };
}

export default fs2Json;
