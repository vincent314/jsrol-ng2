import {NgModule} from '@angular/core';
import {AdminComponent} from './admin.component';
import {AdminTrackListComponent} from './admin-track-list.component';
import {routing} from './admin.routing';
import {BrowserModule} from '@angular/platform-browser';
import {AuthService} from '../services/auth.service';
import {JsrolService} from '../services/jsrol.service';
import {AuthGuard} from '../services/auth-guard.service';
import {SharedModule} from '../shared/shared.module';
@NgModule({
    imports: [BrowserModule,routing, SharedModule],
    declarations: [AdminTrackListComponent, AdminComponent],
    providers: [AuthService, JsrolService, AuthGuard],
    bootstrap: [AdminComponent]
})
export class AdminModule {

}