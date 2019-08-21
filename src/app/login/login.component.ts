import {Component, OnDestroy, OnInit} from '@angular/core';
import { FormControl, FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    emailPattrn: string;
    constructor(private fb: FormBuilder) {
        this.emailPattrn = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';
    }

    ngOnInit(): void {
        this.loginForm = this.fb.group({
            email: ['', [Validators.required, Validators.pattern( this.emailPattrn), Validators.maxLength(30), Validators.minLength(3)]],
            password: ['', [Validators.required, Validators.maxLength(30), Validators.minLength(3)]]
        });

    }
    onSubmit() {
        console.warn('The login form is', this.loginForm.value);
    }
}
