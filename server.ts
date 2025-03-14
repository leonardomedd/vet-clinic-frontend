import 'zone.js/node';
import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine } from '@angular/ssr';
import express from 'express';
import { join } from 'path';
import app from './src/main.server'; 
import { ApplicationRef } from '@angular/core'; 

export function bootstrap() {
  const appServer = express();
  const serverDistFolder = join(__dirname, '..', 'vet-clinic-frontend');
  const browserDistFolder = join(serverDistFolder, 'browser');
  const indexHtml = join(serverDistFolder, 'index.server.html');

  console.log('Server setup started...');
  console.log('Server dist folder:', serverDistFolder);
  console.log('Browser dist folder:', browserDistFolder);
  console.log('Index HTML path:', indexHtml);

  const commonEngine = new CommonEngine();

  appServer.get('*.*', express.static(browserDistFolder, {
    maxAge: '1y'
  }));

  appServer.get('*', (req, res, next) => {
    app().then((appRef: ApplicationRef) => {
      commonEngine
        .render({
          bootstrap: app,
          documentFilePath: indexHtml,
          url: req.originalUrl,
          publicPath: browserDistFolder,
          providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }]
        })
        .then(html => {
          console.log('Rendering completed for URL:', req.originalUrl);
          res.send(html);
        })
        .catch((err: any) => {
          console.error('Rendering error:', err);
          next(err);
        });
    }).catch((err: any) => {
      console.error('Bootstrap error:', err);
      next(err);
    });
  });

  return appServer;
}

const server = bootstrap();
console.log('Server bootstrapped...');
server.listen(4000, () => {
  console.log(`Node Express server listening on http://localhost:4000`);
});