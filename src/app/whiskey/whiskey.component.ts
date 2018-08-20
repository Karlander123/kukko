import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ProductsService } from '../products.service';
import { FormControl } from '@angular/forms';
import { FilterService } from '../filter.service';
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";
import { Subscription } from 'rxjs';
import { MatSort, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-whiskey',
  templateUrl: './whiskey.component.html',
  styleUrls: ['./whiskey.component.css']
})
export class WhiskeyComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  whiskeys: any;
  filteredWhiskeys: any;
  select_year: any[] = [];
  select_country: any[] = [];
  select_type: any[] = [
    { 'name': 'Single Malt', 'value': 1 },
    { 'name': 'Blended', 'value': 2 },
    { 'name': 'Bourbon', 'value': 3 }
  ];

  nameFilter = new FormControl('');
  countryFilter = new FormControl('');
  typeFilter = new FormControl('');
  yearFilter = new FormControl('');
  
  dataSource = new MatTableDataSource();
  columnsToDisplay = ['title', 'price', 'size', 'alc'];
  filterValues = {
    title: '',
    country: '',
    type: '',
    year: ''
  };

  @ViewChild(MatSort) sort: MatSort;

  constructor(private productService: ProductsService,private fs: FilterService,private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer) {
    
  }

  removeAllFilters() {
    this.nameFilter.setValue('');
    this.countryFilter.setValue('');
    this.typeFilter.setValue('');
    this.yearFilter.setValue('');
  }

  createFilter(): (data: any, filter: string) => boolean {
    let filterFunction = function(data, filter): boolean {
      let searchTerms = JSON.parse(filter);
      return data.country.toLowerCase().indexOf(searchTerms.country) !== -1
        && data.type.value.toString().toLowerCase().indexOf(searchTerms.type) !== -1
        && data.year.toString().toLowerCase().indexOf(searchTerms.year) !== -1
        && data.title.toLowerCase().indexOf(searchTerms.title) !== -1
    }
    return filterFunction;
  }

  removeFilter(filter) {
    filter.setValue("");
  }


  ngOnInit() {
    this.subscription = this.productService.getWhiskeys().valueChanges().subscribe(p => {
      this.whiskeys = p;
      this.whiskeys.forEach(whiskey => {
        this.matIconRegistry.addSvgIcon(
          whiskey.country,
          this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/images/lang/" + whiskey.country.toLowerCase() + ".svg")
        );
        if (this.select_country.indexOf(whiskey.country) === -1) this.select_country.push(whiskey.country);
        if (this.select_year.indexOf(whiskey.year) === -1) this.select_year.push(whiskey.year);
      });
      this.dataSource.data = this.whiskeys;
      this.dataSource.filterPredicate = this.createFilter();
      this.dataSource.sort = this.sort;
    });

    this.nameFilter.valueChanges
    .subscribe(
      title => {
        this.filterValues.title = title.toLowerCase();
        this.dataSource.filter = JSON.stringify(this.filterValues);
      }
    )
    this.countryFilter.valueChanges
      .subscribe(
        country => {
          this.filterValues.country = country.toLowerCase();
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      )
    this.typeFilter.valueChanges
      .subscribe(
        type => {
          this.filterValues.type = type.toString();
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      )
    this.yearFilter.valueChanges
    .subscribe(
      year => {
        if(year == false) year = "";
        this.filterValues.year = year.toString();
        this.dataSource.filter = JSON.stringify(this.filterValues);
      }
    )
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
