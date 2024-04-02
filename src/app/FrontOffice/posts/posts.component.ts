import {Component, Inject, OnInit} from '@angular/core';
import {PostService} from "../../Services/post.service";


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


  constructor(private postService: PostService ) {}

  ngOnInit(): void {
    this.getAllPosts();
  }

  getAllPosts(): void {
    this.postService.getAllPosts().subscribe({
      next: (posts) => {
        this.posts = posts;
        console.log('Successfully fetched posts' + posts)
      },
      error: (error) => {
        this.errorMessage = 'Error fetching posts: ' + error.message;
      }
    });
  }

  filterPosts() {
    if (!this.searchTerm) {
      this.getAllPosts();
      return;
    }
    this.posts = this.posts.filter(post =>
      post.title.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  sortPosts() {
    if (this.sortBy === 'asc') {
      this.posts.sort((a, b) => a.nbViews - b.nbViews);
    } else if (this.sortBy === 'des') {
      this.posts.sort((a, b) => b.nbViews - a.nbViews);
    }
  }

}


