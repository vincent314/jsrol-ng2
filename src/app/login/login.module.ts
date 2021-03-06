import {NgModule} from '@angular/core';
import {LoginComponent} from './login.component';
import {BrowserModule} from '@angular/platform-browser';
import {routing} from './login.routing';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {AuthService} from '../services/auth.service';
import {LogoutComponent} from './logout.component';
import {MdlModule} from '@angular-mdl/core';
import {SharedModule} from '../shared/shared.module';

@NgModule({
    imports: [BrowserModule, FormsModule, ReactiveFormsModule, MdlModule, routing, SharedModule],
    declarations: [LoginComponent, LogoutComponent],
    providers: [AuthService]
})
export class LoginModule {

}
