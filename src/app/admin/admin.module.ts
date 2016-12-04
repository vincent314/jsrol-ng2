import {NgModule} from '@angular/core';
import {AdminComponent} from './admin.component';
import {AdminTrackListComponent} from './admin-track-list/admin-track-list.component';
import {routing} from './admin.routing';
import {BrowserModule} from '@angular/platform-browser';
import {AuthService} from '../services/auth.service';
import {JsrolService} from '../services/jsrol.service';
import {AuthGuard} from '../services/auth-guard.service';
import {SharedModule} from '../shared/shared.module';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {AdminService} from './admin.service';
import {AdminEditTrackComponent} from './admin-edit-track/admin-edit-track.component';
import {AdminEventListComponent} from './admin-event-list/admin-event-list.component';
import {AdminEditEventComponent} from './admin-edit-event/admin-edit-event.component';
import {FloatingComponent} from './floating.component';

require('mdl-selectfield/dist/mdl-selectfield');

@NgModule({
    imports: [BrowserModule, ReactiveFormsModule, routing, SharedModule, HttpModule],
    declarations: [
      AdminTrackListComponent,
      AdminComponent,
      AdminEditTrackComponent,
      AdminEventListComponent,
      AdminEditEventComponent,
      FloatingComponent
    ],
    providers: [AuthService, JsrolService, AuthGuard, AdminService],
    bootstrap: [AdminComponent]
})
export class AdminModule {

}
