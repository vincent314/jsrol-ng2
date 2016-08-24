import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FIREBASE_PROVIDERS, defaultFirebase, firebaseAuthConfig, AuthProviders, AuthMethods} from 'angularfire2';
import {routing} from './app.routing';
import {RootComponent} from '../root.component';
import {EventBrowserModule} from './event-browser/event-browser.module';
import {AdminModule} from './admin/admin.module';
import {LoginModule} from './login/login.module';

@NgModule({
    imports: [BrowserModule, routing, EventBrowserModule, AdminModule, LoginModule],
    declarations: [RootComponent],
    providers: [FIREBASE_PROVIDERS,
        defaultFirebase({
            apiKey: 'AIzaSyDOWtDx2pTTgY8jnqxI6_Yh-cvo8VByP-Y',
            authDomain: 'fire-rol.firebaseapp.com',
            databaseURL: 'https://fire-rol.firebaseio.com',
            storageBucket: 'fire-rol.appspot.com',
        }),
        firebaseAuthConfig({
            provider: AuthProviders.Password,
            method: AuthMethods.Password,
            remember: 'default',
            scope: ['email']
        })],
    bootstrap: [RootComponent]
})
export class AppModule {
}