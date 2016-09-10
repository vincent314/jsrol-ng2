import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FirebaseAuth} from 'angularfire2';

@Component({
    selector: 'admin',
    template: require('./admin.component.html')
})
export class AdminComponent implements OnInit {
    currentTab: string;

    constructor(private route: ActivatedRoute, private firebaseAuth$:FirebaseAuth) {
    }

    ngOnInit() {
        // this.currentTab = this.route.pathFromRoot;
      this.firebaseAuth$.subscribe((data)=>{
        console.log(data);
      })
    }
}
