import { Component } from '@angular/core';
import { BadwordService } from '../../Services/badword.service';

@Component({
  selector: 'app-badwords',
  templateUrl: './badwords.component.html',
  styleUrls: ['./badwords.component.css']
})
export class BadwordsComponent {
  badWords: any[] = [];
  newBadWord: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 2;
  totalPages: number = 0;

  constructor(private badWordService: BadwordService) { }

  ngOnInit() {
    this.getAllBadWords();
  }

  getAllBadWords(): void {
    this.badWordService.getAllBadWords().subscribe((badWords: any[]) => {
      this.badWords = badWords;
      this.calculateTotalPages();
    });
  }

  calculateTotalPages(): void {
    this.totalPages = Math.ceil(this.badWords.length / this.itemsPerPage);
  }

  addBadWord(): void {
    if (window.confirm('Are you sure you want to add this bad word?')) {
      if (this.newBadWord.trim() !== '') {
        this.badWordService.addBadWord({ word: this.newBadWord.trim() }).subscribe(badWord => {
          this.badWords.push(badWord);
          this.newBadWord = '';
          this.calculateTotalPages();
        });
      }
    }
  }

  deleteBadWord(id: number): void {
    if (window.confirm('Are you sure you want to delete this bad word?')) {
      this.badWordService.deleteBadWord(id).subscribe(() => {
        this.getAllBadWords();
      });
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  getPaginatedBadWords(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.badWords.slice(startIndex, startIndex + this.itemsPerPage);
  }

}
