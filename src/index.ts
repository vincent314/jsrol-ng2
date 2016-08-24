/// <reference path="../typings/index.d.ts"/>

import 'reflect-metadata';
import 'zone.js/dist/zone';
import './index.scss';
import 'mdi/scss/materialdesignicons.scss';
import {enableProdMode} from '@angular/core';
import {AppModule} from './app/app.module';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

declare var process: any;
if (process.env.NODE_ENV === 'production') {
    enableProdMode();
}

// JIT compile long form

var defaultLocale: string = 'fr_FR';
platformBrowserDynamic().bootstrapModule(AppModule);

