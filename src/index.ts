/// <reference path="../typings/index.d.ts"/>

import 'reflect-metadata';
import 'zone.js/dist/zone';
import {bootstrap} from '@angular/platform-browser-dynamic';
import {FIREBASE_PROVIDERS, defaultFirebase} from 'angularfire2';
import './index.scss';

import {provideRouter} from '@angular/router';
import {enableProdMode} from '@angular/core';
import {routes, Root} from './routes';

declare var process: any;
if (process.env.NODE_ENV === 'production') {
  enableProdMode();
}

bootstrap(Root, [
  FIREBASE_PROVIDERS,
  defaultFirebase({
    apiKey: "AIzaSyDOWtDx2pTTgY8jnqxI6_Yh-cvo8VByP-Y",
    authDomain: "fire-rol.firebaseapp.com",
    databaseURL: "https://fire-rol.firebaseio.com",
    storageBucket: "fire-rol.appspot.com",
  }),
  provideRouter(routes)
]);
