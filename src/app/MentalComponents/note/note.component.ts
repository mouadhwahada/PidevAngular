import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NoteService } from 'src/app/MentalService/note.service';
import { Note } from 'src/app/mentalModels/Note';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent {
  notes: Note[] = [];
  
  constructor(private noteService: NoteService, private router: Router) { }
  
  ngOnInit(): void {
    this.loadNotes();
  }
  
  loadNotes(): void {
    this.noteService.findAllNotes().subscribe(
      notes => {
        this.notes = notes;
      },
      error => {
        console.error('An error occurred while fetching notes:', error);
        // Gérer les erreurs ici
      }
    );
  }
  
  deleteNote(note: Note): void {
    this.noteService.deleteNote(note.idNote).subscribe(
      () => {
        console.log('Note deleted successfully');
        this.loadNotes();
      },
      (error: any) => {
        console.error('Error deleting note', error);
      }
    );
  }

}
