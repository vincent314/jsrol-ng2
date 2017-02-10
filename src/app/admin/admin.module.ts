import {NgModule} from '@angular/core';
import {AdminComponent} from './admin.component';
import {AdminTrackListComponent} from './admin-track-list/admin-track-list.component';
import {routing} from './admin.routing';
import {BrowserModule} from '@angular/platform-browser';
import {AuthService} from '../services/auth.service';
import {JsrolService} from '../services/jsrol.service';
import {AuthGuard} from '../services/auth-guard.service';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {AdminEditTrackComponent} from './admin-edit-track/admin-edit-track.component';
import {AdminEventListComponent} from './admin-event-list/admin-event-list.component';
import {AdminEditEventComponent} from './admin-edit-event/admin-edit-event.component';
import {MdlModule} from 'angular2-mdl';
import {MdlSelectModule} from '@angular2-mdl-ext/select';
import {SharedModule} from '../shared/shared.module';
import {FilterComponent} from './admin-filter/filter.component';
import {AdminLoopPopinComponent} from './admin-loop-dialog/admin-loop-dialog.component';
import {TrackListSelectComponent} from './track-list-selector/track-list-selector.component';
import {Ng2PaginationModule} from 'ng2-pagination';


@NgModule({
    imports: [BrowserModule, FormsModule, ReactiveFormsModule, routing, HttpModule, MdlModule, MdlSelectModule, SharedModule, Ng2PaginationModule],
    declarations: [
      AdminTrackListComponent,
      AdminComponent,
      AdminEditTrackComponent,
      AdminEventListComponent,
      AdminEditEventComponent,
      AdminLoopPopinComponent,
      FilterComponent,
      TrackListSelectComponent
    ],
    providers: [AuthService, JsrolService, AuthGuard],
    bootstrap: [AdminComponent]
})
export class AdminModule {

}
