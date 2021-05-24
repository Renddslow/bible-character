const mri = require('mri');

const pkg = require('./package.json');

const command = mri(process.argv.slice(2), {
  default: {
    watch: false,
    'log-level': 'info',
  },
});

require('esbuild').build({
  entryPoints: ['src/index.ts'],
  bundle: true,
  platform: 'node',
  target: 'es2018',
  watch: command.watch,
  logLevel: command['log-level'],
  format: 'cjs',
  external: [...Object.keys(pkg.dependencies || {}), ...Object.keys(pkg.peerDependencies || {})],
  outfile: 'dist/index.js',
  minify: !process.env.DEV,
  sourcemap: process.env.DEV ? 'inline' : false,
});
