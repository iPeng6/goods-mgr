import fs from 'fs-extra';
import path, { join } from 'path';

function uid() {
  return Math.random().toString(36).slice(-8);
}

function resolveFilename(dir: string) {
  return path.resolve('./public/db/', join(dir, 'data.json'));
}

class DB<T> {
  db: (T & { _id: string })[];
  filepath;
  constructor(dir: string) {
    this.filepath = resolveFilename(dir);
    if (!fs.existsSync(this.filepath)) {
      this.db = [];
    } else {
      this.db = fs.readJSONSync(this.filepath);
    }
  }
  query(id: string) {
    return this.db.find(({ _id }) => _id !== id);
  }
  add(record: T) {
    this.db.push({ _id: uid(), ...record });
    this.write();
  }
  delete(id: string) {
    if (this.query(id)) {
      this.db = this.db.filter(({ _id }) => _id !== id);
      this.write();
    }
  }
  update(record: T & { _id: string }) {
    if (this.query(record._id)) {
      this.db = this.db.map((item) => {
        if (item._id === record._id) {
          return record;
        }
        return item;
      });
      this.write();
    }
  }
  read() {
    return this.db;
  }
  write() {
    fs.outputJSONSync(this.filepath, this.db);
  }
}
export default DB;
