import {Injectable} from '@angular/core';
import {AngularFire, FirebaseListObservable} from 'angularfire2/angularfire2';
import {Observable} from 'rxjs/Rx';
import {TrackModel} from '../model/track.model';
import {EventModel} from '../model/event.model';
import {KmlModel} from '../model/kml.model';
import {TypeModel} from '../model/type.model';
import * as _ from 'lodash';
import moment = require('moment');

@Injectable()
export class JsrolService {

  tracks$: FirebaseListObservable<TrackModel[]>;
  kml$: FirebaseListObservable<KmlModel[]>;
  types$: FirebaseListObservable<TypeModel[]>;

  constructor(private af: AngularFire) {
    this.tracks$ = this.af.database.list('/tracks', {
      query: {
        orderByChild: 'name'
      }
    });

    this.kml$ = this.af.database.list('/kml');

    this.types$ = this.af.database.list('/types');
  }

  getTracks(): Observable<TrackModel[]> {
    return this.tracks$;
  }

  getEvent(id: string): Observable<EventModel> {
    return this.af.database.object(`/events/${id}`);
  }

  getEvents(fromTimestamp: number, limit: number = 5): Observable<EventModel[]> {
    return this.af.database
      .list('/events', {
        query: {
          orderByChild: 'dateTime',
          startAt: fromTimestamp,
          limitToFirst: limit
        }
      })
      .map((result: any[]) => {
        result.forEach((e) => {
          let event: EventModel = e as EventModel;
          event.dateTime = moment(event.dateTime).toDate();
        });
        return result;
      });
  }

  getTrack(id: string): Observable<TrackModel> {
    return this.af.database.object(`/tracks/${id}`);
  }

  getKml(id: string): Observable<any> {
    return this.af.database.object(`/kmls/${id}`);
  }

  saveTrack(track: TrackModel): void {
    this.tracks$.push(track)
  }

  deleteTrack(track: TrackModel): void {
    this.tracks$.remove(track.$key);
  }

  updateTrack(track: TrackModel): void {
    this.tracks$.update(track.$key, track);
  }

  getEventLoops(event: EventModel): Observable<TrackModel[]> {
    if (!event) {
      return Observable.from([]);
    }

    const loopObservables: Observable<TrackModel>[] = _([event.loop1, event.loop2, event.loop3])
      .filter((loopId: string) => loopId)
      .map((loop: string) => this.getTrack(loop))
      .value();

    console.log({loopObservables});

    if (loopObservables.length === 0) {
      return Observable.from([]);
    }

    return Observable.zip(...loopObservables);
  }

}
