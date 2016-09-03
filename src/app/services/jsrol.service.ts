import {Injectable} from '@angular/core';
import {AngularFire} from 'angularfire2/angularfire2';
import {Observable} from 'rxjs/Rx';
import {TrackModel} from '../model/track.model';
import {EventModel} from '../model/event.model';
import moment = require('moment');

@Injectable()
export class JsrolService {

    constructor(private af: AngularFire) {
    }

    getTracks(): Observable<TrackModel[]> {
        return this.af.database.list('/tracks', {
            query: {
                orderByChild: 'name'
            }
        });
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
            .map((result: any[])=> {
                result.forEach((e)=> {
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

    saveTrack(track:TrackModel):void{
        // TODO
    }

}
