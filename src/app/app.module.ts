import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { QuoteClient } from './core/services/api.quotes.service.generated';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatOptionModule } from '@angular/material/core';
import {  FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import {  MatTableModule } from '@angular/material/table'  
import { MatButtonModule } from '@angular/material/button';





@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    MatOptionModule,
    MatInputModule,
    MatFormFieldModule ,
    MatTableModule,
    MatButtonModule,
    MatAutocompleteModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [QuoteClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
