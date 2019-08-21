import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import {SharedModule} from './shared/shared-module';
import {LoginComponent} from './login/login.component';
 import { AppRoutingModule } from './app.routing.module';
 import {SignupComponent} from './signup/signup.component';
import { SignupModule } from './signup/signup.module';
import {ConvertCaseDirective} from './shared/convertcase-directive';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    ConvertCaseDirective
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    SharedModule,
   AppRoutingModule,
   SignupModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
