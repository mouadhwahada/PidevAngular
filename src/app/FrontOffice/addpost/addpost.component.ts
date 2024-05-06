import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {PostService} from "../../Services/post.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-addpost',
  templateUrl: './addpost.component.html',
  styleUrls: ['./addpost.component.css']
})
export class AddpostComponent implements OnInit {
  idUser!: number;
  title!: string;
  content!: string;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private postService: PostService,private router: Router) {}

  ngOnInit(): void {
    this.idUser=1;
  }

  onSubmit(form: NgForm): void {
    if (form.valid) {
      this.postService.addPost(this.idUser, { title: this.title, content: this.content }).subscribe({
        next: (response) => {
          const idPost = response.id;
          this.successMessage = 'Post added successfully!';
          this.router.navigate(['post', 'uploadimages', idPost]);
        },
        error: (error) => {
          if (error.error && error.error) {
            this.errorMessage = 'WARNING : BADWORDS EXIST!';
          } else {
            this.errorMessage = 'Complaint contains bad words!';
          }
        }
      });
    }
  }

}
