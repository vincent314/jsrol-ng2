
import {Component} from '@angular/core';
@Component({
    selector:'loop-link',
    template: `
    <a class="mdl-navigation__link" [hidden]="!loop" [routerLink]="['track', loop]">Boucle 1</a>
`
})
export class LoopLinkComponent{
    constructor(){

    }
}