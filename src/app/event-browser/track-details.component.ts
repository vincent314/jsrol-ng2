import {Component, Input} from '@angular/core';
import {TrackModel} from '../model/track.model';
@Component({
    selector: 'track-details',
    template: `
<div *ngIf="track" >
    <p><i class="mdi mdi-math-compass"></i> {{track.distance | number}} km</p>
</div>
`
})
export class TrackDetailsComponent {
    @Input() track: TrackModel;


}
