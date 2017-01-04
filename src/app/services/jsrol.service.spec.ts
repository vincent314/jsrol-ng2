import {TestBed, fakeAsync, inject, tick} from '@angular/core/testing';
import {JsrolService} from './jsrol.service';
import {AngularFire} from 'angularfire2';
import {Observable} from 'rxjs';
import {EventModel} from '../model/event.model';
import moment = require('moment');

describe('Test JSROL service', () => {
  const mockDatabase = jasmine.createSpyObj('database', ['list', 'object', 'push']);

  let event: EventModel;

  beforeEach(() => {
    event =  {
      $key: 'ABCDEF',
      name: 'Fake event',
      type: 'LRFN',
      dateTime : 1374259500000,
      loop1: '11111111',
      loop2: '22222222'
    };

    TestBed.configureTestingModule({
      providers: [
        JsrolService,
        {
          provide: AngularFire,
          useValue: {database: mockDatabase}
        }
      ]
    });
  });

  it('Should get event', inject([JsrolService, AngularFire],fakeAsync((jsrolService) => {
    let result:EventModel;
    mockDatabase.object.and.returnValue(Observable.of(Object.assign({},event)));
    jsrolService.getEvent('')
      .subscribe((e: EventModel) => {
        result = e;
      });
    tick();
    expect(result).toEqual(event);
  })));

  it('Should get 5 first events', inject([JsrolService], fakeAsync((jsrolService) => {
    let results: EventModel[];
    mockDatabase.list.and.returnValue(Observable.of([Object.assign({},event)]));

    jsrolService.getEvents(1374259500000)
      .subscribe((a:EventModel[])=>{
        results = a;
      });
    tick();

    expect(moment(results[0].dateTime).format('YYYY-MM-DD')).toEqual('2013-07-19');
  })));
});
