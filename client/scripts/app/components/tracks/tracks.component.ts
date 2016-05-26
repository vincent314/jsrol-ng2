import {Component, OnInit} from 'angular2/core';
import {JsrolService} from '../../services/jsrolService';
import ITrack = mm.ITrack;

@Component({
    selector: 'tracks',
    styles: [require('./tracks.component.scss').toString()],
    template: require('./tracks.component.html')
})
export class TracksComponent implements OnInit {

    public tracks:ITrack[];
    public errorMessage:string;

    constructor(private jsrolService:JsrolService) {
    }

    ngOnInit() {
        this.getTracks();
    }

    getTracks() {
        this.jsrolService.getTracks()
            .then((snapshot:FirebaseDataSnapshot) =>{
                this.tracks = snapshot.val();
            })
            .catch((error)=>{
                this.errorMessage = error;
            });
    }
}