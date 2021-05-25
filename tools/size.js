const { execSync } = require('child_process');

const size = () => {
  const out = execSync('du -sh data/', { cwd: process.cwd() });
  const [sz] = out.toString().split('\t');
  console.log(sz);
};

(() => size())();
