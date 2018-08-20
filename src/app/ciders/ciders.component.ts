import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ProductsService } from '../products.service';
import { FormControl } from '@angular/forms';
import { FilterService } from '../filter.service';
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";
import { Subscription } from 'rxjs';
import { MatSort, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-ciders',
  templateUrl: './ciders.component.html',
  styleUrls: ['./ciders.component.css']
})
export class CidersComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  select_type: any[] = [
    { 'name': 'Ciders', 'value': 1 },
    { 'name': 'Mixed Drinks', 'value': 2 },
  ];
  ciders: any;
  filteredCiders: any;

  sweetFilter = new FormControl('');
  dryFilter = new FormControl('');
  typeFilter = new FormControl('');
  
  dataSource = new MatTableDataSource();
  columnsToDisplay = ['title', 'price', 'size', 'alc'];
  filterValues = {
    type: '',
    taste: ''
  };

  @ViewChild(MatSort) sort: MatSort;

  constructor(private productService: ProductsService,private fs: FilterService,private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer) {
    
  }

  removeFilter(filter) {
    filter.setValue("");
  }

  removeAllFilters() {
    this.sweetFilter.setValue('');
    this.dryFilter.setValue('');
    this.typeFilter.setValue('');
  }

  createFilter(): (data: any, filter: string) => boolean {
    let filterFunction = function(data, filter): boolean {
      let searchTerms = JSON.parse(filter);
      return data.taste.value.toString().toLowerCase().indexOf(searchTerms.taste) !== -1
      && data.type.value.toString().toLowerCase().indexOf(searchTerms.type) !== -1  
    }
    return filterFunction;
  }

  ngOnInit() {
    this.subscription = this.productService.getCiders().valueChanges().subscribe(p => {
      this.ciders = p;
      this.ciders.forEach(cider => {
        if(cider.country.indexOf(' ') >= 0) cider.country = cider.country.replace(' ', '-');
        this.matIconRegistry.addSvgIcon(
          cider.country,
          this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/images/lang/" + cider.country.toLowerCase() + ".svg")
        );
        // if (this.select_country.indexOf(beer.country) === -1) this.select_country.push(beer.country);
        // if (this.select_type.indexOf(beer.type) === -1) this.select_type.push(beer.type);
      });
      this.dataSource.data = this.ciders;
      this.dataSource.filterPredicate = this.createFilter();
      this.dataSource.sort = this.sort;
    });

  this.sweetFilter.valueChanges
    .subscribe(
      taste => {
        if(taste == true) {
          taste = 2;
          this.dryFilter.setValue("");
        }
        else { taste = ""; }
        this.filterValues.taste = taste.toString();
        this.dataSource.filter = JSON.stringify(this.filterValues);
      }
    )
    this.dryFilter.valueChanges
    .subscribe(
      taste => {
        if(taste == true) {
          taste = 1;
          this.sweetFilter.setValue("");
        }
        else { taste = ""; }
        this.filterValues.taste = taste.toString();
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
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
