import { Component } from '@angular/core';
import { EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent {
  @Input() maxRating: number = 5;
  @Input() currentRating: number = 0;
  @Output() ratingChanged: EventEmitter<number> = new EventEmitter<number>();

  // Tableau pour stocker les étoiles
  stars: any[] = [];

  constructor() { }

  ngOnInit(): void {
    // Remplissez le tableau avec des valeurs arbitraires (peu importe la valeur, seule la longueur compte)
    this.stars = new Array(this.maxRating);
  }

  setRating(rating: number): void {
    this.currentRating = rating;
    this.ratingChanged.emit(rating);
  }

  getIconName(index: number): string {
    return index < this.currentRating ? 'star' : 'star_border';
  }
 

}
