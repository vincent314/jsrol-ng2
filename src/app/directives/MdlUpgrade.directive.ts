import {AfterViewInit, Directive} from '@angular/core';
declare const componentHandler:any;


@Directive({
    selector:'[mdl]'
})
export class MDL extends AfterViewInit{
    ngAfterViewInit(){
        componentHandler.upgradeAllRegistered();
    }
}