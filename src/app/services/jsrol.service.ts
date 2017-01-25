import {Injectable} from '@angular/core';
import {AngularFire, FirebaseListObservable} from 'angularfire2/angularfire2';
import {Observable} from 'rxjs/Rx';
import * as _ from 'lodash';
import moment = require('moment');

@Injectable()
export class JsrolService {

  tracks$: FirebaseListObservable<TrackModel[]>;
  kmls$: FirebaseListObservable<KmlModel[]>;
  types$: FirebaseListObservable<TypeModel[]>;
  events$: FirebaseListObservable<EventModel[]>;

  constructor(private af: AngularFire) {
    this.tracks$ = this.af.database.list('/tracks', {
      query: {
        orderByChild: 'name'
      }
    });

    this.kmls$ = this.af.database.list('/kmls');

    this.types$ = this.af.database.list('/types');

    this.events$ = this.af.database.list('/events');
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

  saveTrack(track: TrackModel, kml: string): TrackModel {
    // Should save a new KML or keep existing ?
    let kmlObject = {};
    if(kml){
      console.debug('Saving a new KML', kml);
      kmlObject = {kml:this.saveKml(kml).key};
    }

    const newTrack: TrackModel = Object.assign(
      {},
      track,
      kmlObject);

    if(newTrack.$key){
      console.debug('Update track');
      this.tracks$.update(newTrack.$key, newTrack);
    } else {
      console.debug('Create a new track');
      this.tracks$.push(newTrack);
    }
    return newTrack;

  }

  saveKml(kml: string): firebase.database.ThenableReference {
    return this.kmls$.push(kml);
  }

  removeKml(kml: string){
    this.kmls$.remove(kml);
  }

  deleteTrack(track: TrackModel): void {
    if(track.kml) {
      this.removeKml(track.kml);
    }
    this.tracks$.remove(track.$key);
  }

  getEventLoops(event: EventModel): Observable<TrackModel[]> {
    if (!event) {
      return Observable.of([]);
    }

    const loopObservables: Observable<TrackModel>[] = _([event.loop1, event.loop2, event.loop3])
      .filter((loopId: string) => loopId)
      .map((loop: string) => this.getTrack(loop))
      .value();

    if (loopObservables.length === 0) {
      return Observable.of([]);
    }

    return Observable.zip(...loopObservables);
  }

  saveEvent(event:EventModel): EventModel {
    if(!event){
      return null;
    }

    if(event.$key) {
      this.events$.update(event.$key, _.omit(event,['$key','$exists']));
    } else {
      this.events$.push(event);
    }
    return event;
  }

}
