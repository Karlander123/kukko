import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ProductsService } from '../products.service';
import { FormControl } from '@angular/forms';
import { FilterService } from '../filter.service';
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";
import { Subscription } from 'rxjs';
import { MatSort, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-beers',
  templateUrl: './beers.component.html',
  styleUrls: ['./beers.component.css']
})
export class BeersComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  beers: any;
  filteredBeers: any;
  select_country: any[] = [];
  select_type: any[] = [
    { 'name': 'Pale Lager', 'value': 1 },
    { 'name': 'Dark Lager', 'value': 2 },
    { 'name': 'Ale', 'value': 3 },
    { 'name': 'Porter/Stout', 'value': 4 },
    { 'name': 'Special', 'value': 5 }
  ];

  nameFilter = new FormControl('');
  countryFilter = new FormControl('');
  typeFilter = new FormControl('');
  glutenFilter = new FormControl('');
  bottleFilter = new FormControl('');
  draftFilter = new FormControl('');
  
  
  dataSource = new MatTableDataSource();
  columnsToDisplay = ['title', 'price', 'size', 'alc'];
  filterValues = {
    title: '',
    country: '',
    type: '',
    glutenfree: '',
    bottle: '',
    draft: ''
  };

  @ViewChild(MatSort) sort: MatSort;

  constructor(private productService: ProductsService,private fs: FilterService,private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer) {
    
  }

  removeAllFilters() {
    this.nameFilter.setValue('');
    this.countryFilter.setValue('');
    this.typeFilter.setValue('');
    this.glutenFilter.setValue('');
    this.bottleFilter.setValue('');
    this.draftFilter.setValue('');
  }

  createFilter(): (data: any, filter: string) => boolean {
    let filterFunction = function(data, filter): boolean {
      let searchTerms = JSON.parse(filter);
      return data.country.toLowerCase().indexOf(searchTerms.country) !== -1
        && data.type.value.toString().toLowerCase().indexOf(searchTerms.type) !== -1
        && data.title.toLowerCase().indexOf(searchTerms.title) !== -1
        && data.glutenfree.toString().toLowerCase().indexOf(searchTerms.glutenfree) !== -1
        && data.bottle.toString().toLowerCase().indexOf(searchTerms.bottle) !== -1
        && data.draft.toString().toLowerCase().indexOf(searchTerms.draft) !== -1
    }
    return filterFunction;
  }

  removeFilter(filter) {
    filter.setValue("");
  }


  ngOnInit() {
    this.subscription = this.productService.getBeers().valueChanges().subscribe(p => {
      this.beers = p;
      this.beers.forEach(beer => {
          this.matIconRegistry.addSvgIcon(
            beer.country,
            this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/images/lang/" + beer.country.toLowerCase() + ".svg")
          );
        if (this.select_country.indexOf(beer.country) === -1) this.select_country.push(beer.country);
        // if (this.select_type.indexOf(beer.type) === -1) this.select_type.push(beer.type);
      });
      this.dataSource.data = this.beers;
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

    this.glutenFilter.valueChanges
    .subscribe(
      glutenfree => {
        if(glutenfree == false) glutenfree = "";
        this.filterValues.glutenfree = glutenfree.toString();
        this.dataSource.filter = JSON.stringify(this.filterValues);
      }
    )
    this.bottleFilter.valueChanges
    .subscribe(
      bottle => {
        if(bottle == false) {
          bottle = "";
        } 
        else {
          this.draftFilter.setValue("");
        }
        this.filterValues.bottle = bottle.toString();
        this.dataSource.filter = JSON.stringify(this.filterValues);
      }
    )
    this.draftFilter.valueChanges
    .subscribe(
      draft => {
        if(draft == false) {
          draft = "";
        } 
        else {
          this.bottleFilter.setValue("");
        }
        this.filterValues.draft = draft.toString();
        this.dataSource.filter = JSON.stringify(this.filterValues);
      }
    )
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
