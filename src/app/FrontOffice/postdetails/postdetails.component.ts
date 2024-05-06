import {Component, OnInit} from '@angular/core';
import {PostService} from "../../Services/post.service";
import {ActivatedRoute, Router} from "@angular/router";
import {CommentService} from "../../Services/comment.service";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";

@Component({
  selector: 'app-postdetails',
  templateUrl: './postdetails.component.html',
  styleUrls: ['./postdetails.component.css']
})
export class PostdetailsComponent implements OnInit {
  post: any;
  comments!: any[];
  reacts!: any[];
  idPost!: any;
  idUser!: any;
  type!: any;

  likesCount = 0;
  dislikesCount = 0;

  commentBeingEdited: any = null;

  showTooltip: any;

  constructor(private postService: PostService,
              private commentService: CommentService,
              private router: Router,
              private route: ActivatedRoute,
              private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.idPost = this.route.snapshot.paramMap.get('id');
    this.idUser = 3;
    this.getPost(this.idPost);
    this.getCommentsByPost(this.idPost);
    this.getReactByPost(this.idPost);
    this.getTypeReact(this.idUser,this.idPost);
    this.showTooltip = { like: false, dislike: false };
  }

  getPost(idPost: number): void {
    this.postService.getPost(idPost).subscribe((response) => {
      this.post = response;
      console.log("Post fetched successfully");
    });
  }

  getImageUrl(imageName: string): SafeResourceUrl {
    const url = `http://localhost:8070/post/loadImage/${imageName}`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  getCommentsByPost(idPost: number): void {
    this.commentService.getCommentsByPost(idPost).subscribe((response) => {
      this.comments = response;
      console.log("Comments fetched successfully");
    });
  }

  getReactByPost(idPost: number): void {
    this.postService.getReactByPost(idPost).subscribe((response) => {
      this.reacts = response;
      console.log("reacts", this.reacts);
      this.likesCount = response.filter(react => react.typeReact === 'Like').length;
      this.dislikesCount = response.filter(react => react.typeReact === 'Dislike').length;
      console.log("Reacts fetched successfully");
    });
  }

  getTypeReact(idUser: number, idPost: number): void {
    this.postService.getTypeReact(idUser,idPost).subscribe((response) => {
      this.type = response;
    });
  }

  addComment(idUser: number, idPost: number, content: string): void {
    const newComment = {
      content: content
    };
    this.commentService.addComment(idUser, idPost, newComment).subscribe((response) => {
      console.log('Comment added successfully:', response);
      this.getCommentsByPost(this.idPost);
    });
  }

  editComment(comment: any): void {
    this.commentBeingEdited = comment;
  }

  updateComment(idComment: number, content: string): void {
    const updatedComment = {
      content: content
    };

    this.commentService.updateComment(idComment, updatedComment).subscribe((response) => {
      console.log('Comment updated successfully:', response);
      this.getCommentsByPost(this.idPost);
      this.commentBeingEdited = null;
    });
  }

  deleteComment(idComment: number): void {
    this.commentService.deleteComment(idComment).subscribe(() => {
      console.log('Comment deleted successfully');
      this.getCommentsByPost(this.idPost);
    });
  }

  addReact(idUser: number, idPost: number, type: string) {
    this.postService.addReact(idUser, idPost, type).subscribe((result) => {
      this.type = result.typeReact;
      this.getReactByPost(this.idPost);
    });
  }

  deleteReact(idUser: number, idPost: number) {
    this.postService.deleteReact(idUser, idPost).subscribe(() => {
      this.type = null;
      this.getReactByPost(this.idPost);
    });
  }

  getLikeUserNames(reacts: any[]): string[] {
    return reacts.filter(react => react.typeReact === 'Like').map(react => react.author.userName);
  }

  getDislikeUserNames(reacts: any[]): string[] {
    return reacts.filter(react => react.typeReact === 'Dislike').map(react => react.author.userName);
  }
}
