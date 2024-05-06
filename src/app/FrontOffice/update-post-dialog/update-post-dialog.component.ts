import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-update-post-dialog',
  templateUrl: 'update-post-dialog.component.html',
  styleUrls: ['update-post-dialog.component.css']
})
export class UpdatePostDialogComponent {
  @Input() showDialog!: boolean;
  @Input() post: any;
  @Output() closeDialog: EventEmitter<void> = new EventEmitter<void>();
  @Output() updatePost: EventEmitter<{ id: number, updatedPost: any }> = new EventEmitter<{ id: number, updatedPost: any }>();

  onUpdatePost() {
    this.updatePost.emit({ id: this.post.id, updatedPost: this.post });
  }

  onCloseDialog() {
    this.closeDialog.emit();
  }

}
