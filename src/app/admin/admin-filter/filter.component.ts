import {Component, Inject, EventEmitter} from '@angular/core';

@Component({
  selector: 'jsrol-filter',
  templateUrl: './filter.component.html',
  outputs:['filterChanged']
})
export class FilterComponent{
  type:string;
  textSearch:string;
  filterChanged = new EventEmitter<FilterModel>();

  constructor(@Inject('TYPES') public TYPES: any[]){}

  onTypeFilterChange(){
    this.filterChanged.emit({type: this.type});
  }

  onTextSearch(){
    this.filterChanged.emit({textSearch: this.textSearch})
  }
}
