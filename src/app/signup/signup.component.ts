import { Component, OnInit, ElementRef, ViewChildren, AfterViewInit } from '@angular/core';
import { FormBuilder, Validators, FormControl, FormGroup, FormControlName, AbstractControl } from '@angular/forms';


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
// this.mobPattern = '/^\d{10}$/';
    }
    ngOnInit(): void {
        this.signUpForm = this.fb.group({
            frstName: ['', [Validators.required, Validators.pattern(this.noSpecialCharsPatter)]],
            lastName: ['', Validators.pattern(this.noSpecialCharsPatter)],
            email: ['', [Validators.required, Validators.maxLength(30), Validators.minLength(3)]],
            phoneNum: [''],
            address:  this.fb.group({
                street: ['', Validators.required],
                city: ['', Validators.required],
                state: ['', Validators.required]
              }),
              passwords: this.fb.group({
                password: [ '', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
                cnfrmpassword: ['']
              }, {validator: passwordSimilarity})
        });
    }
    resetForm(): void {
        this.signUpForm.reset();
    }
    onSubmit(): void {
        console.log('form Submitted Successfully');
    }
}
