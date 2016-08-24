import {AfterViewInit, Directive} from '@angular/core';
declare const componentHandler:any;


@Directive({
    selector:'[mdl]'
})
export class MDL implements AfterViewInit{
    ngAfterViewInit(){
        componentHandler.upgradeAllRegistered();
    }
}