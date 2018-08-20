import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private db: AngularFireDatabase) {
  }

  getBeers() {
    return this.db.list('/products/Beers');
  }
  
  getWhiskeys() {
    return this.db.list('/products/Whiskeys');
  }

  getRhumCognacs() {
    return this.db.list('/products/Rhum-Cognac');
  }
  
  getCiders() {
    return this.db.list('/products/Ciders');
  }
  
  getSnacks() {
    return this.db.list('/products/Snacks');
  }
}
