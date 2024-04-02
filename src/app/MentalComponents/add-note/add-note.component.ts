import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NoteService } from 'src/app/MentalService/note.service';
import { QuizService } from 'src/app/MentalService/quiz.service';
import { Note } from 'src/app/mentalModels/Note';
import { Quiz } from 'src/app/mentalModels/QuizModel';

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.css']
})
export class AddNoteComponent {
  noteForm!: FormGroup;
  quizzes: Quiz[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private noteService: NoteService,
    private quizService: QuizService
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.fetchQuizzes();
  }

  initForm(): void {
    this.noteForm = this.formBuilder.group({
      valueNote: ['', Validators.required],
      operation: ['', Validators.required],
      descNote: ['', Validators.required],
      selectedQuiz: ['', Validators.required]
    });
  }

  fetchQuizzes(): void {
    this.quizService.findAllQuizzes().subscribe(
      (quizzes: Quiz[]) => {
        this.quizzes = quizzes;
      },
      (error) => {
        console.error('Error fetching quizzes:', error);
      }
    );
  }

  addNote(): void {
    if (this.noteForm.valid) {
      const { valueNote, operation, descNote, selectedQuiz } = this.noteForm.value;
      const note: Note = { 
        idNote: -1, // Vous devez inclure idNote ici
        valueNote, 
        operation, 
        descNote, 
        quiz: selectedQuiz 
      };
      this.noteService.addNoteToQuiz(selectedQuiz.titleQuiz, note).subscribe(
        (response) => {
          console.log('Note added successfully:', response);
          this.noteForm.reset();
          alert('Note added successfully!');
        },
        (error) => {
          console.error('Error adding note:', error);
          alert('Failed to add note: ' + error.message);
        }
      );
    } else {
      alert('Please fill all required fields correctly and select a quiz!');
    }
  }

}
