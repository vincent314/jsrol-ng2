/// <reference path='../typings/index.d.ts'/>

import 'reflect-metadata';
import 'zone.js/dist/zone';
import {bootstrap} from '@angular/platform-browser-dynamic';
import {FIREBASE_PROVIDERS, defaultFirebase} from 'angularfire2';
import './index.scss';

import {enableProdMode} from '@angular/core';
import {MainComponent} from './app/components/main/main.component.ts';
import {APP_ROUTER_PROVIDERS} from './app/app.routes';

declare var process:any;
if (process.env.NODE_ENV === 'production') {
    enableProdMode();
}

bootstrap(MainComponent, [
    FIREBASE_PROVIDERS,
    defaultFirebase('https://fire-rol.firebaseio.com'),
    APP_ROUTER_PROVIDERS
]);
