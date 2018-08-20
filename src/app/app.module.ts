import { SortService } from './sort.service';
import { FilterService } from './filter.service';
import { ProductsService } from './products.service';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTableModule } from '@angular/material/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSort, MatSortModule } from '@angular/material';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireStorageModule } from 'angularfire2/storage';

import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BeersComponent } from './beers/beers.component';
import { WhiskeyComponent } from './whiskey/whiskey.component';
import { RhumCognacComponent } from './rhum-cognac/rhum-cognac.component';
import { CidersComponent } from './ciders/ciders.component';
import { NavComponent } from './nav/nav.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OtherComponent } from './other/other.component';
import { environment } from '../environments/environment';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BeersComponent,
    WhiskeyComponent,
    CidersComponent,
    NavComponent,
    OtherComponent,
    RhumCognacComponent
  ],
  imports: [
    NgbModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    HttpClientModule,
    BrowserAnimationsModule,
    BrowserModule,
    MatTabsModule,
    MatIconModule,
    MatMenuModule,
    MatCardModule,
    MatDividerModule,
    MatExpansionModule,
    MatTableModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatChipsModule,
    MatSelectModule,
    MatSortModule,
    MatCheckboxModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { path: 'whiskeys', component: WhiskeyComponent },
      { path: 'rhum-cognac', component: RhumCognacComponent },
      { path: 'beers', component: BeersComponent },
      { path: 'ciders', component: CidersComponent },
      { path: 'snacks', component: OtherComponent },
    ])
  ],
  providers: [ProductsService, FilterService, SortService],
  bootstrap: [AppComponent]
})
export class AppModule { }
