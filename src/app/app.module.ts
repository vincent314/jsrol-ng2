import {NgModule, ApplicationRef, LOCALE_ID} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {RouterModule} from '@angular/router';
import {removeNgStyles, createNewHosts} from '@angularclass/hmr';
import {ENV_PROVIDERS} from './environment';
import {ROUTES} from './app.routes';
import {App} from './app.component';
import {APP_RESOLVER_PROVIDERS} from './app.resolver';
import {FIREBASE_PROVIDERS, defaultFirebase, firebaseAuthConfig, AuthProviders, AuthMethods} from 'angularfire2';
import {EventBrowserModule} from './event-browser/event-browser.module';
import {AdminModule} from './admin/admin.module';
import {LoginModule} from './login/login.module';
import {MdlModule} from 'angular2-mdl';
import {TranslateModule} from 'ng2-translate';

/*
 * Platform and Environment providers/directives/pipes
 */
// App is our top level component

// Application wide providers
const APP_PROVIDERS = [
  ...APP_RESOLVER_PROVIDERS,
  FIREBASE_PROVIDERS,
  defaultFirebase({
    apiKey: 'AIzaSyDOWtDx2pTTgY8jnqxI6_Yh-cvo8VByP-Y',
    authDomain: 'fire-rol.firebaseapp.com',
    databaseURL: 'https://fire-rol.firebaseio.com',
    storageBucket: 'fire-rol.appspot.com',
  }),
  firebaseAuthConfig({
    provider: AuthProviders.Password,
    method: AuthMethods.Password
  }),
  { provide: LOCALE_ID, useValue: "fr-FR" }
];

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [App],
  declarations: [
    App
  ],
  imports: [ // import Angular's modules
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES, {useHash: true}),
    EventBrowserModule,
    AdminModule,
    LoginModule,
    MdlModule,
    TranslateModule.forRoot()
  ],
  providers: [ // expose our Services and Providers into Angular's dependency injection
    ENV_PROVIDERS,
    APP_PROVIDERS
  ]
})
export class AppModule {
  constructor(public appRef: ApplicationRef) {
  }

  hmrOnInit(store) {
    if (!store || !store.state) return;
    console.log('HMR store', store);
    this.appRef.tick();
    delete store.state;
  }

  hmrOnDestroy(store) {
    const cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
    // recreate elements
    store.disposeOldHosts = createNewHosts(cmpLocation);
    // remove styles
    removeNgStyles();
  }

  hmrAfterDestroy(store) {
    // display new elements
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }

}

