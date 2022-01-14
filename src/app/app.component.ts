import { Component, OnInit } from '@angular/core';
import { QuoteClient } from './core/services/api.quotes.service.generated';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

import { debounceTime } from 'rxjs/operators';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'TradingAPP';
  searchText:any;
  public companies:any;
  public quotes:any;
  public filteredQuotes:any;
  public filteredOptions:any;
  formGroup! : FormGroup;
  displayedColumns: string[] = ['name', 'symbol', 'exchange', 'change' ];
  constructor(private quoteClient:QuoteClient,private fb : FormBuilder) {
  }
  ngOnInit()
  {
    this.initForm();
    this.getAllCompanies();
  }

  initForm(){
    this.formGroup = this.fb.group({
      'quotes' : ['']
    })
    if(this.formGroup)
    {
      const deneme = this.formGroup?.get('quotes');
      deneme?.valueChanges
      .pipe(debounceTime(1000))
      .subscribe(response => {
        console.log('entered data is ', response);
        if(response && response.length){
          this.filterData(response);
          console.log(this.filteredOptions);
        } else {
          this.filteredOptions = [];
        }      
      })  
    }  
  }

  onSubmitCompanySearch(entered:any){
    console.log(entered);
    if(entered.quotes && entered.quotes.length)
    {
          this.getQuotesWithfilter(entered.quotes);
    }
          else {
          this.quotes = [];
        }      
    }


  getQuotesWithfilter(enteredData:string)
  {
    return this.quoteClient.getQuote(enteredData).subscribe((data) => {
      this.quotes = data;
      this.filteredQuotes = this.quotes?.data;
      console.warn(this.quotes);
    });
  }

  getAllCompanies(): void {
     this.quoteClient.getAllCompanies().subscribe((data) => {
      this.companies = data;
      console.warn(this.companies);
    });
  }

  filterData(enteredData: string){
    enteredData = enteredData.toLowerCase();
    console.log("entered Data: " + enteredData);
    this.filteredOptions = this.companies?.data.filter((item: any) => {
      return item.symbol.toLowerCase().indexOf(enteredData) > -1
    })
  }
}
