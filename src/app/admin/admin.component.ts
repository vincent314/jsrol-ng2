import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'admin',
    template: require('./admin.component.html')
})
export class AdminComponent implements OnInit {
    currentTab: string;

    constructor(private route: ActivatedRoute) {
    }

    ngOnInit() {
        // this.currentTab = this.route.pathFromRoot;

    }
}
