/// <reference path="../domain/index.ts"/>

import {Injectable} from '@angular/core';
import {AngularFire} from 'angularfire2/angularfire2';
import moment = require('moment');
import Event = jsrol.Event;
import Track = jsrol.Track;
import {Observable} from 'rxjs/Rx';

@Injectable()
export class JsrolService {

    constructor(private af: AngularFire) {
    }

    getTracks(): Observable<Track[]> {
        return this.af.database.list('/tracks', {
            query: {
                orderByChild: 'name'
            }
        });
    }

    getEvent(id:string): Observable<Event> {
        return this.af.database.object(`/events/${id}`);
    }

    getEvents(fromTimestamp: number, limit: number = 3): Observable<Event[]> {
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
                    let event: Event = e as Event;
                    event.dateTime = moment(event.dateTime).toDate();
                });
                return result;
            });
    }

    getTrack(id: string): Observable<Track> {
        return this.af.database.object(`/tracks/${id}`);
    }

    getKml(id: string): Observable<any> {
        return this.af.database.object(`/kmls/${id}`);
    }
}