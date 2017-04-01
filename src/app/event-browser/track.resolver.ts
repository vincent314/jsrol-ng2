import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { JsrolService } from '../services/jsrol.service';
@Injectable()
export class TrackResolver implements Resolve<TrackModel> {
  constructor(private jsrolService: JsrolService) {

  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<TrackModel>
    | Promise<TrackModel>
    | TrackModel {
    const {trackId} = <EventBrowserParams>route.queryParams;
    if(trackId) {
      return this.jsrolService.getTrack(trackId)
        .take(1);
    } else {
      return Observable.of({});
    }
  }

}
