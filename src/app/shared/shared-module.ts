import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';



@NgModule({
    imports: [CommonModule, ReactiveFormsModule, FormsModule, BrowserModule],
    exports: [CommonModule, ReactiveFormsModule, FormsModule, BrowserModule]
})
export class SharedModule {

}
