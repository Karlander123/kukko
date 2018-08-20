import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  cards: any[];

  constructor() { 
    this.cards = [
      { 'title': 'Beers' },
      { 'title': 'Whiskey' },
      { 'title': 'Ciders' },
      { 'title': 'Other' }
    ];
  }

  ngOnInit() {
  }

}
