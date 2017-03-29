import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { Http, HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { ROUTES } from './app.routes';
import { App } from './app.component';
import { AngularFireModule, AuthMethods, AuthProviders, FIREBASE_PROVIDERS, FirebaseAppConfig } from 'angularfire2';
import { EventBrowserModule } from './event-browser/event-browser.module';
import { AdminModule } from './admin/admin.module';
import { LoginModule } from './login/login.module';
import { MdlModule } from '@angular-mdl/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { StoreModule } from '@ngrx/store';
import { RouterStoreModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { EventBrowserEffects } from './reducers/event-browser.effects';
import * as fromReducer from './reducers/index';

export function firebaseConfig(): FirebaseAppConfig {
  return {
    apiKey: 'AIzaSyDOWtDx2pTTgY8jnqxI6_Yh-cvo8VByP-Y',
    authDomain: 'fire-rol.firebaseapp.com',
    databaseURL: 'https://fire-rol.firebaseio.com',
    storageBucket: 'fire-rol.appspot.com',
  }
}

export function firebaseAuthConfig() {
  return {
    provider: AuthProviders.Password,
    method: AuthMethods.Password
  }
}

export function createTranslateLoader(http: Http) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

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
    StoreModule.provideStore(fromReducer.reducers),
    RouterStoreModule.connectRouter(),
    StoreDevtoolsModule.instrumentOnlyWithExtension({
      maxAge: 5
    }),
    EffectsModule.run(EventBrowserEffects),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [Http]
      }
    }),
    AngularFireModule.initializeApp(firebaseConfig(), firebaseAuthConfig())
  ],
  providers: [ // expose our Services and Providers into Angular's dependency injection
    FIREBASE_PROVIDERS,
    {provide: LOCALE_ID, useValue: "fr-FR"}
  ]
})
export class AppModule {
}

