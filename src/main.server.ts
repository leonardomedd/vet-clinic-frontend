import { enableProdMode } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { mergeApplicationConfig } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { ApplicationRef } from '@angular/core';

if (process.env['NODE_ENV'] === 'production') {
  enableProdMode();
}

const serverConfig = {
  providers: [
    provideServerRendering()
  ]
};

const config = mergeApplicationConfig(appConfig, serverConfig);

export function app(): Promise<ApplicationRef> {
  return bootstrapApplication(AppComponent, config);
}

export default app;