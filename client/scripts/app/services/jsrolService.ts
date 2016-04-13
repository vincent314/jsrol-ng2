import {Http, Response} from 'angular2/http';
import {Injectable} from 'angular2/core';
import {Observable} from 'rxjs/Observable';
import ITrack = mm.ITrack;
import {config} from '../config/config';

@Injectable()
export class JsrolService {

    constructor(private http:Http) {

    }

    public getTracks():Observable<ITrack[]> {
        return this.http.get(config.server.baseUrl + '/tracks')
            .map(res => <ITrack[]>res.json())
            .catch(this.handleError);
    }

    public handleError(err:Response) {
        console.log(err);
        return Observable.throw(err.json().error || 'Server error');
    }
}