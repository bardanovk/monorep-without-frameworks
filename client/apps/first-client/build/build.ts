import { build, BuildOptions } from 'esbuild';
import { baseBuildOptions, applicationName } from './base.config';
import { HTMLPlugin } from '../../../../build-plugins';

const buildOptions: BuildOptions = {
  ...baseBuildOptions,
  minify: true,
  legalComments: 'none',
  sourcemap: false,
  plugins: [
    ...baseBuildOptions.plugins,
    HTMLPlugin({ title: applicationName }),
  ],
};

build(buildOptions)
  .then(() => {
    console.log(
      '\n' + '\x1b[32m' + 'Success build: ' + applicationName + '\x1b[0m',
    );
  })
  .catch((err) => {
    console.error('Build error ' + err);
  });
