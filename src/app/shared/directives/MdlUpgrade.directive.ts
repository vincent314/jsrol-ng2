import {AfterViewInit, Directive} from '@angular/core';
declare const componentHandler: any;


@Directive({
  selector: '[mdl]'
})
export class MDL implements AfterViewInit {
  ngAfterViewInit() {
    console.log('MDL afterViewInit');
    componentHandler.upgradeAllRegistered();
  }
}
