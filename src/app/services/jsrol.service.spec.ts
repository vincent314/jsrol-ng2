import {TestBed, fakeAsync, inject, tick} from '@angular/core/testing';
import {JsrolService} from './jsrol.service';
import {AngularFire} from 'angularfire2';
import {Observable} from 'rxjs';
import {EventModel} from '../model/event.model';
import {TrackModel} from '../model/track.model';
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

  describe('Test getEventLoops', ()=> {
    it('Should get 2 tracks', inject([JsrolService], fakeAsync((jsrolService) => {
      const event: EventModel = {
        loop1: '111111',
        loop2: '222222'
      };
      const track: TrackModel = {
        $key: 'AAAAA'
      };

      mockDatabase.object.and.returnValue(Observable.of(track));

      let result: TrackModel[] = [];

      jsrolService.getEventLoops(event)
        .subscribe((tracks: TrackModel[]) => {
          result = tracks;
        });
      tick();


      expect(result).toEqual([Object({$key: 'AAAAA'}), Object({$key: 'AAAAA'})]);
    })));

    it('Should get 0 track', inject([JsrolService], fakeAsync((jsrolService) => {
      const event: EventModel = {};

      let result:TrackModel[];
      let completed = false;

      jsrolService.getEventLoops(event)
        .subscribe({
          next: (tracks: TrackModel[]) => {
            result = tracks;
          },
          complete: ()=>{
            completed = true;
          }
        });
      tick();

      expect(completed).toBeTruthy();
      expect(result).toEqual([]);
    })));
  });
});
