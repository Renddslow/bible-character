import { exec } from 'child_process';
import pkgUp from 'pkg-up';
import path from 'path';
import catchify from 'catchify';

const pExec = (cmd: string, opts: string[]) =>
  new Promise((res, rej) => {
    exec(`${cmd} ${opts.join(' ')}`, (err, stdout, stderr) => {
      if (err) return rej(err);
      if (stderr) return rej(stderr);
      return res(stdout);
    });
  });

const grep = async (pattern: string, directory: string) => {
  const pkg = await pkgUp();
  const dir = path.join(path.dirname(pkg), path.join('data', directory));
  const [err, out] = await catchify(pExec(`grep`, [`-r`, pattern, dir]));
  if (err) return null;
  return out.split('\n').map((o) => o.split(':')[0].trim()).filter((o) => o.trim());
};

export default grep;
