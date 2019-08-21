import { Component, OnInit, ElementRef, ViewChildren, AfterViewInit } from '@angular/core';
import { FormBuilder, Validators, FormControl, FormGroup, FormControlName, AbstractControl } from '@angular/forms';
import { GenericValidator } from '../shared/generic-validator';
import { Observable, fromEvent, merge } from 'rxjs';

import { debounceTime } from 'rxjs/operators';

// custom validator for cross field validation
function passwordSimilarity(c: AbstractControl): {[key: string]: boolean} {
    const firstCtrl = c.get('password');
    const secondCtrl = c.get('cnfrmpassword');
    // initially when the controls are not touched we don't want validation
    if (firstCtrl.pristine || secondCtrl.pristine) {
        return null;
    }
    if (firstCtrl.value !== secondCtrl.value) {
        return {'notSame': true};
    }
    return null;
}

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html'
})
export class SignupComponent implements OnInit {

    public displayMessage: { [key: string]: string };

    noSpecialCharsPatter = new RegExp('^[a-zA-Z0-9_]*$');
    signUpForm: FormGroup;
    emailPattrn: string;
    mobPattern: string;
    constructor(private fb: FormBuilder) {
        this.emailPattrn = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';
// this.mobPattern = '/^\d{10}$/';
    }
    ngOnInit(): void {
        this.signUpForm = this.fb.group({
            frstName: ['', [Validators.required, Validators.pattern(this.noSpecialCharsPatter)]],
            lastName: ['', Validators.pattern(this.noSpecialCharsPatter)],
            email: ['', [Validators.required, (( Validators.pattern( this.emailPattrn), Validators.maxLength(30), Validators.minLength(3)]],
            phoneNum: [''],
            address:  this.fb.group({
                street: ['', Validators.required],
                city: ['', Validators.required],
                state: ['', Validators.required],
                zip: ['', Validators.required],
              }),
              passwords: this.fb.group({
                password: [ '', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
                cnfrmpassword: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]]
              }, {validator: passwordSimilarity})
        });
    }
    populateData(): void {
        // assign values to the subset of the formControls
        this.signUpForm.patchValue({
            firstName: 'sai',
            lastName: 'amar',
            email: 'sai.amar@email.com',
            confirmEmail: 'sai.amar@email.com'
        });
    }

    resetForm(): void {
        this.signUpForm.reset();
    }

}
