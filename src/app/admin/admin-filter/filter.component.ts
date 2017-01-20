import {Component, Inject, EventEmitter} from '@angular/core';

@Component({
  selector: 'jsrol-filter',
  templateUrl: './filter.component.html',
  outputs:['filterChanged']
})
export class FilterComponent{
  type:string;
  filterChanged = new EventEmitter<FilterModel>();

  constructor(@Inject('TYPES') private TYPES: any[]){}

  onTypeFilterChange(){
    console.log({type: this.type});
    this.filterChanged.emit({type: this.type});
  }
}
