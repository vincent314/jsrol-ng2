import {NgModule} from '@angular/core';
import {MapComponent} from '../map/map.component';
import {JsrolService} from '../services/jsrol.service';
import {TrackFilterPipe} from './pipes/track-filter.pipe';
import {TranslateModule} from 'ng2-translate';
@NgModule({
  declarations: [
    MapComponent,
    TrackFilterPipe
  ],
  providers: [
    JsrolService
  ],
  exports: [
    MapComponent, TrackFilterPipe, TranslateModule
  ]
})
export class SharedModule{

}
