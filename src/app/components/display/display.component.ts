import {Component} from '@angular/core';
import {TrackListComponent} from '../trackList/trackList.component';
import {EventListComponent} from '../eventList/eventList.component';
import {JsrolService} from '../../services/jsrol.service';
import {MD_TABS_DIRECTIVES} from '@angular2-material/tabs';
import {MapComponent} from '../map/map.component';


@Component({
    directives: [TrackListComponent, EventListComponent, MD_TABS_DIRECTIVES, MapComponent],
    providers: [JsrolService],
    template: `
        <md-tab-group>
        <md-tab>
            <template md-tab-label>Randonnées</template>
            <template md-tab-content>
                    <event-list></event-list>
            </template>
        </md-tab>
        <md-tab>
            <template md-tab-label>Parcours</template>
            <template md-tab-content>
                <track-list></track-list>            
            </template>
        </md-tab> 
        </md-tab-group>`
})
export class DisplayComponent {

}
