import { exec } from 'child_process';
import path from 'path';
import pkgUp from 'pkg-up';
import catchify from 'catchify';
import fs from 'fs';
import { promisify } from 'util';
import yaml from 'yaml';

const pExec = (cmd: string, opts: string[]) => new Promise((res, rej) => {
  exec(`${cmd} ${opts.join(' ')}`, (err, stdout, stderr) => {
    if (err) return rej(err);
    if (stderr) return rej(stderr);
    return res(stdout);
  });
});

const read = promisify(fs.readFile);

const grep = async (pattern: string, directory: string) => {
  const pkg = await pkgUp();
  const dir = path.join(path.dirname(pkg), path.join('data', directory));
  const [err, out] = await catchify(pExec(`grep`, [`-r`, pattern, dir]));
  if (err) return null;
  const [file] = out.split(':');
  return file.trim();
};

const getDocumentByID = async (id: string, type?: 'characters') => {
  if (!type) {
    console.warn('You are searching the whole data folder with no type specifier. This can be slow.');
  }
  const dir = await grep(`"id: ${id}"`, type || '/');

  if (!dir) return null;

  const doc = (await read(dir)).toString();
  return yaml.parse(doc);
};

export default getDocumentByID;
