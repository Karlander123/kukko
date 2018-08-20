import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ProductsService } from '../products.service';
import { FormControl } from '@angular/forms';
import { FilterService } from '../filter.service';
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";
import { Subscription } from 'rxjs';
import { MatSort, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-other',
  templateUrl: './other.component.html',
  styleUrls: ['./other.component.css']
})
export class OtherComponent implements OnInit, OnDestroy {
  subscription: Subscription;

  dataSource = new MatTableDataSource();
  columnsToDisplay = ['title', 'price'];

  @ViewChild(MatSort) sort: MatSort;

  constructor(private productService: ProductsService) {
    
  }

  ngOnInit() {
    this.subscription = this.productService.getSnacks().valueChanges().subscribe(p => {
      this.dataSource.data = p;
      this.dataSource.sort = this.sort;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
