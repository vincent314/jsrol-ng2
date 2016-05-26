import {Http, Response} from 'angular2/http';
import {Injectable} from 'angular2/core';
import {Observable} from 'rxjs/Observable';
import ITrack = mm.ITrack;
import {config} from '../config/config';
import {Password} from "../config/password";
declare var firebase:any;

@Injectable()
export class JsrolService {

    app:any;

    constructor() {
        // Initialize Firebase
        var config = {
            apiKey: Password.API_KEY,
            authDomain: "fire-rol.firebaseapp.com",
            databaseURL: "https://fire-rol.firebaseio.com",
            storageBucket: "fire-rol.appspot.com",
        };
        this.app = firebase.initializeApp(config);
    }

    public getTracks():Promise<FirebaseDataSnapshot> {
        return firebase.database().ref('/tracks').once('value');
        // return this.http.get(config.server.baseUrl + '/tracks')
        //     .map(res => <ITrack[]>res.json())
        //     .catch(this.handleError);
    }

    public handleError(err:Response) {
        console.log(err);
        return Observable.throw(err.json().error || 'Server error');
    }
}