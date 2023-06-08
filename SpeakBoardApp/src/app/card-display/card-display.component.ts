import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-card',
  templateUrl: './card-display.component.html',
  styleUrls: ['./card-display.component.css']
})
export class CardDisplayComponent implements OnInit {
  cards: any[] = [];
  title = '';
  description = '';
  idList = '647e1e7bbfd1a55713a7ef1e';
  successMessage = '';
  errorMessage = '';

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getCards();
  }

  getCards() {
    this.http.get<any[]>('http://localhost:3000/api/cards').subscribe((cards: any[]) => {
      this.cards = cards;
    }, (error: any) => {
      console.error(error);
    });
  }

  createCard() {
    this.http.post('http://localhost:3000/api/cards', {
      title: this.title,
      description: this.description,
      idList: this.idList
    }).subscribe(response => {
      // handle response here
      this.getCards(); // Refresh the cards after creating a new one
      this.title = ''; // Clear the form fields
      this.description = '';
      this.idList = '647e1e7bbfd1a55713a7ef1e'; // Reset idList field
      this.successMessage = 'Card created successfully'; // Set success message
      this.errorMessage = ''; // Clear error message

    }, error => {
      // handle error here
      this.successMessage = ''; // Clear success message
      this.errorMessage = 'Failed to create card'; // Set error message
    });
  }
}
