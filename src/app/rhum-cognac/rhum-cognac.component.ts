import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ProductsService } from '../products.service';
import { FormControl } from '@angular/forms';
import { FilterService } from '../filter.service';
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";
import { Subscription } from 'rxjs';
import { MatSort, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-rhum-cognac',
  templateUrl: './rhum-cognac.component.html',
  styleUrls: ['./rhum-cognac.component.css']
})
export class RhumCognacComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  select_type: any[] = [
    { 'name': 'Rhum', 'value': 1 },
    { 'name': 'Cognac', 'value': 2 },
  ];
  rhumCognacs: any;

  typeFilter = new FormControl('');
  
  dataSource = new MatTableDataSource();
  columnsToDisplay = ['title', 'price', 'size', 'alc'];
  filterValues = {
    type: ''
  };

  @ViewChild(MatSort) sort: MatSort;

  constructor(private productService: ProductsService,private fs: FilterService,private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer) {
    
  }

  removeFilter(filter) {
    filter.setValue("");
  }

  removeAllFilters() {
    this.typeFilter.setValue('');
  }

  createFilter(): (data: any, filter: string) => boolean {
    let filterFunction = function(data, filter): boolean {
      let searchTerms = JSON.parse(filter);
      return data.type.value.toString().toLowerCase().indexOf(searchTerms.type) !== -1
    }
    return filterFunction;
  }

  ngOnInit() {
    this.subscription = this.productService.getRhumCognacs().valueChanges().subscribe(p => {
      this.rhumCognacs = p;
      this.rhumCognacs.forEach(rhumCognac => {
        if(rhumCognac.country.indexOf(' ') >= 0) rhumCognac.country = rhumCognac.country.replace(' ', '-');
        this.matIconRegistry.addSvgIcon(
          rhumCognac.country,
          this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/images/lang/" + rhumCognac.country.toLowerCase() + ".svg")
        );
        // if (this.select_country.indexOf(beer.country) === -1) this.select_country.push(beer.country);
        // if (this.select_type.indexOf(beer.type) === -1) this.select_type.push(beer.type);
      });
      this.dataSource.data = this.rhumCognacs;
      this.dataSource.filterPredicate = this.createFilter();
      this.dataSource.sort = this.sort;
    });

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
