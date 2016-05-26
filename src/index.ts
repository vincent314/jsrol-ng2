/// <reference path="../typings/main.d.ts"/>

import 'reflect-metadata';
import 'zone.js/dist/zone';
import {bootstrap} from '@angular/platform-browser-dynamic';

import './index.scss';

import {Hello} from './app/hello';

import {enableProdMode} from '@angular/core';

declare var process: any;
if (process.env.NODE_ENV === 'production') {
  enableProdMode();
}

bootstrap(Hello);
