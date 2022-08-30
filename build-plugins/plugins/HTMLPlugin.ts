import { Plugin } from 'esbuild';
import { writeFile } from 'fs/promises';
import * as path from 'path';

interface HTMLPluginOptions {
  isDev?: boolean;
  template?: string;
  title?: string;
  jsPath?: string[];
  cssPath?: string[];
}

const renderHtml = (options: HTMLPluginOptions): string => {
  return (
    options.template ||
    `
      <!doctype html>
      <html lang="en">
          <head>
              <meta charset="UTF-8">
              <meta name="viewport"
                    content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
              <meta http-equiv="X-UA-Compatible" content="ie=edge">
              <title>${options.title}</title>
              ${options?.cssPath
                ?.map((path) => `<link href=${path} rel="stylesheet">`)
                .join(' ')}
          </head>
          <body>
              <div id="root"></div>
              ${options?.jsPath
                ?.map((path) => `<script src=${path}></script>`)
                .join(' ')}
              ${
                options.isDev
                  ? `<script>
              const evtSource = new EventSource('http://localhost:3000/hot_reload')
             evtSource.onopen = function () { console.log('hot reload gate active') }
             evtSource.onerror = function () { console.log('error hot reload gate') }
             evtSource.onmessage = function () { 
                  console.log('message')
                  window.location.reload();
              }
             
             </script>`
                  : ``
              }
          </body>
      </html>
                    `
  );
};

const preparePaths = (outputs: string[]) => {
  return outputs.reduce<Array<string[]>>(
    (acc, path) => {
      const [js, css] = acc;
      const splittedFileName = path.split('/').pop();

      if (splittedFileName?.endsWith('.js')) {
        js.push(splittedFileName);
      } else if (splittedFileName?.endsWith('.css')) {
        css.push(splittedFileName);
      }

      return acc;
    },
    [[], []],
  );
};

export const HTMLPlugin = (options: HTMLPluginOptions): Plugin => {
  return {
    name: 'HTMLPlugin',
    setup(build) {
      const outdir = build.initialOptions.outdir;

      build.onEnd(async (result) => {
        const outputs = result.metafile?.outputs;
        const [jsPath, cssPath] = preparePaths(Object.keys(outputs || {}));

        if (outdir) {
          await writeFile(
            path.resolve(outdir, 'index.html'),
            renderHtml({ jsPath, cssPath, ...options }),
          );
        }
      });
    },
  };
};
