const yaml = require('yaml');
const cuid = require('cuid');
const fs = require('fs');
const path = require('path');

(async () => {
  const [type, name] = process.argv.slice(2);

  if (!name) throw new Error(`No name was provided`);

  const data = {
    id: cuid(),
    name,
  };

  if (type === 'character') {
    data.born = { year: 0 };
    data.died = { year: 0 };
    data.gender = 'male'; // there are significantly more named male characters, saves time
    data.type = 'human';
  }

  fs.writeFileSync(path.join(__dirname, '..', `data/${type}s`, `${name.toLowerCase()}.yml`), yaml.stringify(data));
})();
