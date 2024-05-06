import {Component, OnInit} from '@angular/core';
import {PostService} from "../../Services/post.service";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";

@Component({
  selector: 'app-myposts',
  templateUrl: './myposts.component.html',
  styleUrls: ['./myposts.component.css']
})
export class MypostsComponent implements OnInit {
  posts!: any[];
  idUser!: number;
  showUpdateDialog = false;
  postToUpdate: any;

  constructor(private postService: PostService, private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.idUser = 1; //storageService.getUser().id;  //storageService.getUserId();
    this.getPostsByUser(this.idUser);
  }

  getPostsByUser(idUser: number): void {
    this.postService.getPostsByUser(idUser).subscribe((response) => {
      this.posts = response;
    });
  }

  getImageUrl(imageName: string): SafeResourceUrl {
    const url = `http://localhost:8070/post/loadImage/${imageName}`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  updatePost(id: number, updatedPost: any): void {
    this.postService.updatePost(id, updatedPost)
      .subscribe(post => {
        // const index = this.posts.findIndex(p => p.id === id);
        // this.posts[index] = post;
      });
    this.showUpdateDialog = false;
    this.getPostsByUser(this.idUser);
  }

  deletePost(id: number) {
    if (window.confirm('Are you sure you want to delete this post?')) {
      this.postService.deletePost(id).subscribe(() => {
        this.getPostsByUser(this.idUser);
      });
    }
  }

  openUpdateDialog(post: any) {
    this.postToUpdate = post;
    this.showUpdateDialog = true;
  }

}
