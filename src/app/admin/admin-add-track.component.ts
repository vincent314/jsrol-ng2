import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder} from '@angular/forms';
import {AdminService} from './admin.service';
@Component({
    selector: 'add-track',
    template: require('./admin-add-track.component.html')
})
export class AdminAddTrackComponent implements OnInit {
    addForm: FormGroup;

    constructor(private fb: FormBuilder, private adminService:AdminService) {

    }

    ngOnInit(): void {
        this.addForm = this.fb.group(
            {
                name: '',
                type: '',
                distance: 0,
                kmlContent: ''
            }
        );
    }

    onSubmit(): void {
        console.log('SUBMIT');

    }
}