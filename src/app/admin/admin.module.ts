import {NgModule} from '@angular/core';
import {AdminComponent} from './admin.component';
import {AdminTrackListComponent} from './admin-track-list.component';
import {routing} from './admin.routing';
import {BrowserModule} from '@angular/platform-browser';
import {AuthService} from '../services/auth.service';
import {JsrolService} from '../services/jsrol.service';
import {AuthGuard} from '../services/auth-guard.service';
import {SharedModule} from '../shared/shared.module';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {AdminService} from './admin.service';
import {AdminAddTrackComponent} from './admin-add-track.component';
@NgModule({
    imports: [BrowserModule, ReactiveFormsModule, routing, SharedModule, HttpModule],
    declarations: [AdminTrackListComponent, AdminComponent, AdminAddTrackComponent],
    providers: [AuthService, JsrolService, AuthGuard, AdminService],
    bootstrap: [AdminComponent]
})
export class AdminModule {

}
