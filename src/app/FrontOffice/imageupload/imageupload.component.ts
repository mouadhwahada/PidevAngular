import { Component } from '@angular/core';
import {PostService} from "../../Services/post.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-imageupload',
  templateUrl: './imageupload.component.html',
  styleUrls: ['./imageupload.component.css']
})
export class ImageuploadComponent {
  id: any;
  selectedFiles?: FileList;
  message: string[] = [];
  previews: string[] = [];

  constructor(private postService: PostService, private activatedroute : ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.activatedroute.paramMap.subscribe(params => {
      this.id = params.get('id');
    });
  }

  selectFiles(event: any): void {
    this.message = [];
    this.selectedFiles = event.target.files;

    this.previews = [];
    if (this.selectedFiles && this.selectedFiles[0]) {
      const numberOfFiles = this.selectedFiles.length;
      for (let i = 0; i < numberOfFiles; i++) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          console.log(e.target.result);
          this.previews.push(e.target.result);
        };

        reader.readAsDataURL(this.selectedFiles[i]);
      }
    }
  }

  uploadFiles(): void {
    this.message = [];

    if (this.selectedFiles) {
      for (let i = 0; i < this.selectedFiles.length; i++) {
        this.upload(i, this.selectedFiles[i]);
      }
    }
  }

  upload(idx: number, file: File): void {
    if (file) {
      this.postService.saveImage(file, this.id).subscribe({
        next: (res: any) => {
            const msg = 'Uploaded the file successfully: ' + file.name;
            this.message.push(msg);
            this.router.navigate(['posts']);
        },
        error: (err: any) => {
          const msg = 'Could not upload the file: ' + file.name;
          this.message.push(msg);
          this.router.navigate(['posts']);
        }
      });
    }
  }
}
