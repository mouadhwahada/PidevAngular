import {Component, OnInit} from '@angular/core';
import {PostService} from "../../Services/post.service";
import {ActivatedRoute, Router} from "@angular/router";
import {CommentService} from "../../Services/comment.service";
import {Observable, of} from "rxjs";

@Component({
  selector: 'app-postdetails',
  templateUrl: './postdetails.component.html',
  styleUrls: ['./postdetails.component.css']
})
export class PostdetailsComponent implements OnInit {
  post: any;
  imageSources: Observable<string[]> = of([]);
  comments!: any[];
  reacts!: any[];
  idPost!: any;
  idUser!: any;
  type!: any;

  likesCount = 0;
  dislikesCount = 0;
  commentBeingEdited: any = null;

  constructor(private postService: PostService, private commentService: CommentService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.idPost = this.route.snapshot.paramMap.get('id');
    this.idUser = 1;
    this.getPost(this.idPost);
    this.getCommentsByPost(this.idPost);
    this.getReactByPost(this.idPost);
    this.getTypeReact(this.idUser,this.idPost);
  }

  getPost(idPost: number): void {
    this.postService.getPost(idPost).subscribe((response) => {
      this.post = response;
      console.log(this.post);
      this.getImageSources().then(sources => {
        this.imageSources = of(sources);
      });
    });
  }

  getImageSources(): Promise<string[]> {
    if (this.post && this.post.images) {
      return Promise.all(this.post.images.map((image: { type: any; data: string; }) => {
        if (image.data.startsWith('data:')) {
          const mimeType = image.data.split(';')[0].split(':')[1];
          return Promise.resolve(image.data);
        } else {
          return Promise.resolve(`data:${image.type};base64,${image.data}`);
        }
      }));
    } else {
      return Promise.resolve([]);
    }
  }

  getCommentsByPost(idPost: number): void {
    this.commentService.getCommentsByPost(idPost).subscribe((response) => {
      this.comments = response;
      console.log("Comments fetched successfully");
      console.log(this.comments);

    });
  }

  getReactByPost(idPost: number): void {
    this.postService.getReactByPost(idPost).subscribe((response) => {
      this.reacts = response;
      this.likesCount = response.filter(react => react.typeReact === 'Like').length;
      this.dislikesCount = response.filter(react => react.typeReact === 'Dislike').length;
      console.log("Reacts fetched successfully");
    });
  }

  getTypeReact(idUser: number, idPost: number): void {
    this.postService.getTypeReact(idUser,idPost).subscribe((response) => {
      this.type = response;
      console.log("type");
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

 /* addReact(idUser: number, idPost: number, reactType: string): void {
    const react = {
      typeReact: reactType
    };

    this.postService.addReact(idUser, idPost, react).subscribe((response) => {
      console.log(`${reactType} added successfully:`, response);
      this.getReactByPost(this.idPost);
    });
    //window.location.reload();
  }*/
  addReact(idUser: number, idPost: number, type: string) {
    this.postService.addReact(idUser, idPost, type).subscribe((result) => {
      // Update type based on the result
      this.type = result.typeReact;
    });
    window.location.reload();
  }

  deleteReact(idUser: number, idPost: number) {
    this.postService.deleteReact(idUser, idPost).subscribe(() => {
      // React deleted successfully, reset the type to null
      this.type = null;
    });
    window.location.reload();
  }
}
