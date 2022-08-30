import { build, BuildOptions } from 'esbuild';
import * as path from 'path';

const applicationName = 'first-server';

const pathFromRootDir = (...pathParts: string[]) => {
  return path.join(__dirname, '..', '..', '..', '..', ...pathParts);
};

const buildOptions: BuildOptions = {
  entryPoints: [pathFromRootDir('server', 'apps', applicationName, 'main.ts')],
  outdir: pathFromRootDir('dist', 'back-end', applicationName),
  allowOverwrite: true,
  tsconfig: pathFromRootDir('tsconfig.json'),
  bundle: true,
  treeShaking: true,
  external: ['./node_modules/*'],
  platform: 'node',
  target: ['node16.13'],
};

console.log(buildOptions);

build(buildOptions)
  .then(() => {
    console.log(
      '\n' + '\x1b[32m' + 'Success build: ' + applicationName + '\x1b[0m',
    );
  })
  .catch((err) => {
    console.error('Build error ' + err);
  });
