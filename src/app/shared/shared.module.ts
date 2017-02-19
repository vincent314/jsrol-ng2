import {NgModule} from '@angular/core';
import {MapComponent} from '../map/map.component';
import {JsrolService} from '../services/jsrol.service';
import {TrackFilterPipe} from './pipes/track-filter.pipe';
import {TranslateModule} from '@ngx-translate/core';
@NgModule({
  declarations: [
    MapComponent,
    TrackFilterPipe
  ],
  providers: [
    JsrolService,
    {
      provide: 'TYPES', useValue: [
      {key: 'RANDOXYGENE', value: 'Randoxygène'},
      {key: 'LRFN', value: 'Friday Night'},
      {key: 'ROL_CITY', value: 'ROL City'},
      {key: 'ROL_PARADE', value: 'ROL Parade'}
    ]
    }
  ],
  exports: [
    MapComponent, TrackFilterPipe, TranslateModule
  ]
})
export class SharedModule{

}
