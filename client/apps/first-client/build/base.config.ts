import { BuildOptions } from 'esbuild';
import * as path from 'path';

import { CleanPlugin, HTMLPlugin } from '../../../../build-plugins';

export const applicationName = 'first-client';

export const pathFromRootDir = (...pathParts: string[]) => {
  return path.join(__dirname, '..', '..', '..', '..', ...pathParts);
};

export const baseBuildOptions: BuildOptions = {
  entryPoints: [pathFromRootDir('client', 'apps', applicationName, 'main.tsx')],
  outdir: pathFromRootDir('dist', 'front-end', applicationName),
  entryNames: '[dir]/bundle.[hash]',
  allowOverwrite: true,
  tsconfig: pathFromRootDir('tsconfig.json'),
  bundle: true,
  sourcemap: true,
  metafile: true,
  platform: 'browser',
  plugins: [CleanPlugin],
  loader: {
    '.png': 'file',
    '.svg': 'file',
    '.jpg': 'file',
  },
};
