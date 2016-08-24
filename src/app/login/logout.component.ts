import {Component, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';
require('./login.scss');
@Component({
    selector: 'logout',
    template: `
<div id="logout-container">
    <div id="logout-card" class="mdl-card mdl-shadow--2dp">
        {{message}}
    </div>
</div>
`
})
export class LogoutComponent implements OnInit {
    message: string = "Déconnexion en cours…";

    constructor(private authService: AuthService) {
    }

    ngOnInit() {
        this.authService.logout();
        this.message = "Vous êtes déconnecté";
    }
}