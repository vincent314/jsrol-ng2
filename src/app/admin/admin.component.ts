import {Component, OnInit, trigger, state, style, transition, animate} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FirebaseAuth} from 'angularfire2';

interface RouteData{
  model:string;
}

@Component({
  selector: 'admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  animations: [trigger('openClose', [
    state('collapsed, void',style({
      right: '-10px'
    })),
    state('expanded', style({
      'margin-left': 'auto'
    })),
    transition('collapsed <=> expanded', [animate(500, style({height: '250px'})), animate(500)])
  ])]
})
export class AdminComponent implements OnInit {
  stateExpression: string;

  constructor(private route: ActivatedRoute, private firebaseAuth$: FirebaseAuth) {
  }

  ngOnInit() {
    this.firebaseAuth$.subscribe();

    const data = this.route.snapshot.data as RouteData;
    this.stateExpression = (data.model) ? 'expanded' : 'collapsed';
  }
}
