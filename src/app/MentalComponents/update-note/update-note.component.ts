import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NoteService } from 'src/app/MentalService/note.service';
import { Note } from 'src/app/mentalModels/Note';

@Component({
  selector: 'app-update-note',
  templateUrl: './update-note.component.html',
  styleUrls: ['./update-note.component.css']
})
export class UpdateNoteComponent {
  updateNoteForm!: FormGroup;
  noteId!: number;
  note!: Note;

  constructor(
    private formBuilder: FormBuilder,
    private noteService: NoteService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.updateNoteForm = this.formBuilder.group({
      valueNote: ['', Validators.required],
      operation: ['', Validators.required],
      descNote: ['', Validators.required]
    });

    this.route.params.subscribe(params => {
      this.noteId = +params['id'];
    });
  
  this.noteService.findNoteById(this.noteId).subscribe(
    (note: Note) => {
      this.note = note;
      this.updateNoteForm.patchValue({
        valueNote: note.valueNote,
        descNote: note.descNote


      });
    },
    error => {
      console.error('Error fetching question data:', error);
    }
  );
  }

  updateNote(): void {
    if (this.updateNoteForm.valid) {
      const updatedNoteData = this.updateNoteForm.value;
      this.noteService.UpdateNote(this.noteId, updatedNoteData).subscribe(
        (updatedNote) => {
          console.log('Note updated successfully:', updatedNote);
          alert('Note updated successfully');
          this.router.navigate(['/list-of-notes']);
        },
        (error: any) => {
          console.error('Error updating note:', error);
          alert('Error updating note. Please try again.');
        }
      );
    } else {
      console.error('Invalid form data. Cannot update note.');
      alert('Invalid form data. Please fill in all required fields.');
    }
  }
}
