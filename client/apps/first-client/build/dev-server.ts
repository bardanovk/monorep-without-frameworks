import { build, BuildOptions } from 'esbuild';
import {
  baseBuildOptions,
  applicationName,
  pathFromRootDir,
} from './base.config';
import { HTMLPlugin } from '../../../../build-plugins';

import * as express from 'express';
import { EventEmitter } from 'events';

const PORT = 3000;

const app = express();
const emitter = new EventEmitter();

app.use(express.static(baseBuildOptions.outdir));

app.get('/hot_reload', (req, res) => {
  const headers = {
    'Content-Type': 'text/event-stream',
    Connection: 'keep-alive',
    'Cache-Control': 'no-cache',
  };
  res.writeHead(200, headers);
  res.write('data: {}');

  emitter.on('refresh', () => {
    res.write('data: message \n\n');
  });
});

function sendMessage() {
  emitter.emit('refresh', '123123');
}

const buildOptions: BuildOptions = {
  ...baseBuildOptions,
  plugins: [
    ...baseBuildOptions.plugins,
    HTMLPlugin({ title: applicationName, isDev: true }),
  ],
  watch: {
    onRebuild(error, result) {
      if (error) {
        console.error(error);
      } else {
        console.log('build...');
        sendMessage();
      }
    },
  },
};

app.listen(PORT, () => {
  console.log(
    '\n' +
      '\x1b[32m' +
      `Server ${applicationName} has been started at port ${PORT}` +
      '\x1b[0m',
  );
});

build(buildOptions)
  .then((result) => {
    console.log('Build result: ', result);
  })
  .catch((err) => {
    console.error('Build error ' + err);
  });
