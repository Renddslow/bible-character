const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const yaml = require('yaml');

const read = promisify(fs.readFile);

(async () => {
  const [filepath] = process.argv.slice(2);
  const file = await read(path.join(process.cwd(), filepath));
  const { id } = yaml.parse(file.toString());
  const prog = require('child_process').spawn('pbcopy');
  prog.stdin.write(id);
  prog.stdin.end();
})();
