import { Injectable } from '@angular/core';
import * as _ from 'lodash';


@Injectable({
  providedIn: 'root'
})
export class FilterService {

  constructor() { }

  /* 
  filter_c[0] = filteredDrinks
  filter_c[1] = drinks
  filter_c[2] = filters
  filter_c[3] = properties
  */

  private applyFilters(filter_c) {
    filter_c[0] = _.filter(filter_c[1], _.conforms(filter_c[2]) )
  }

  /// filter property by equality to rule
  filterExact(property: string, rule: any, filter_c) {
    // for(let key in this.arrows) {
    //   this.arrows[key].visible = false;
    // }
    // for(let key in this.arrows) {
    //   this.arrows[key].visible = false;
    // }
    filter_c[3][property] = property;
    console.log(filter_c[3][property])
    filter_c[2][property] = val => val == rule
    this.applyFilters(filter_c)
  }

    /// filter if property includes rule
    filterName(property: string, rule: any, filter_c) {
      // for(let key in this.arrows) {
      //   this.arrows[key].visible = false;
      // }
      // for(let key in this.arrows) {
      //   this.arrows[key].visible = false;
      // }
      filter_c[3][property] = property;
      console.log(filter_c[3][property])
      filter_c[2][property] = val => val.toLowerCase().includes(rule.toLowerCase())
      this.applyFilters(filter_c)
      if(rule == "") {
        this.removeFilter(property, filter_c);
      }
    }

  /// removes filter
  removeFilter(property: string, filter_c) {
    // for(let key in this.arrows) {
    //   this.arrows[key].visible = false;
    // }
    console.log(filter_c[3][property])
    delete filter_c[2][property];
    filter_c[3][property] = undefined;
    this.applyFilters(filter_c);
  }
}
