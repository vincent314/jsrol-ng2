
import {NgModule} from '@angular/core';
import {MDL} from './directives/MdlUpgrade.directive';
@NgModule({
    declarations:[MDL],
    exports: [MDL]
})
export class SharedModule{

}