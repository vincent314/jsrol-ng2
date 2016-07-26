/// <reference path="../domain/index.ts"/>

import {Injectable} from '@angular/core';
import {AngularFire} from 'angularfire2/angularfire2';
import moment = require('moment');
import Event = jsrol.Event;
import Track = jsrol.Track;

@Injectable()
export class JsrolService {
    af:AngularFire;

    constructor(af:AngularFire) {
        this.af = af;
    }

    getTracks() {
        return this.af.database.list('/tracks', {
            query: {
                orderByChild: 'name'
            }
        });
    }

    getEvents() {
        return this.af.database
            .list('/events', {
                query: {
                    orderByChild: 'dateTime'
                }
            })
            .map((result:any[])=> {
                result.forEach((e)=> {
                    let event:Event = e as Event;
                    event.dateTime = moment(event.dateTime).toDate();
                });
                return result;
            });
    }

    getKml(id:string) {
        return this.af.database.object('/kmls/' + id);
    }
}
