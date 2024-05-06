import {Component, OnInit} from '@angular/core';
import {PostService} from "../../Services/post.service";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import {TranslationService} from "../../Services/translation.service";

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  posts: any[] = [];
  errorMessage: string = '';
  searchTerm: string = '';
  sortBy: string = '';

  totalPages!: number;
  currentPage: number = 1;
  totalItems!: number;
  itemsPerPage: number = 3;

  translatedText!: any;

  constructor(private postService: PostService, private sanitizer: DomSanitizer, private translationService: TranslationService) {}

  ngOnInit(): void {
    this.getAllPosts();
  }

  getAllPosts(): void {
    this.postService.getAllPosts().subscribe({
      next: (posts) => {
        this.posts = posts;
        this.totalItems = posts.length;
        console.log('Successfully fetched posts' + posts)
        this.updateTotalPages();
      },
      error: (error) => {
        this.errorMessage = 'Error fetching posts: ' + error.message;
      }
    });
  }

  getImageUrl(imageName: string): SafeResourceUrl {
    const url = `http://localhost:8070/post/loadImage/${imageName}`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  filterPosts() {
    if (!this.searchTerm) {
      this.getAllPosts();
      return;
    }
    this.posts = this.posts.filter(post =>
      post.title.toLowerCase().includes(this.searchTerm.toLowerCase())||
      post.content.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    this.updateTotalPages();
  }

  sortPosts() {
    if (this.sortBy === 'asc') {
      this.posts.sort((a, b) => a.nbViews - b.nbViews);
    } else if (this.sortBy === 'des') {
      this.posts.sort((a, b) => b.nbViews - a.nbViews);
    }
  }

  getPagedData(posts: any[]): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return posts.slice(startIndex, startIndex + this.itemsPerPage);
  }

  updateTotalPages(): void {
    this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
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

  translatePost(text: string, source: string, target: string): void {
    this.translationService.translateText(text, source, target).subscribe((response) => {
      this.translatedText = response.translatedText;
    }, (error) => {
      console.error('An error occurred:', error);
    });
  }


}
