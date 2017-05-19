import {inject, TestBed} from '@angular/core/testing';
// Load the implementations that should be tested
import {App} from './app.component';
import {TranslateService} from '@ngx-translate/core';

describe('App', () => {
  // provide our implementations or mocks to the dependency injector
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      App,
      {
        provide: TranslateService, useValue: jasmine.createSpyObj('TranslateService',['setDefaultLang'])
      }
    ]}));

  it('should be true', inject([ App ], (app: App) => {
    expect(true).toBe(true);
  }));
});
