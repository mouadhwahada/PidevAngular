import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from 'src/app/MentalService/question.service';
import { Question } from 'src/app/mentalModels/Question';

@Component({
  selector: 'app-update-question',
  templateUrl: './update-question.component.html',
  styleUrls: ['./update-question.component.css']
})
export class UpdateQuestionComponent {
  updateQuestionForm!: FormGroup;
  questionId!: number;
  question!: Question;

  constructor(private formBuilder: FormBuilder, private questionService: QuestionService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.updateQuestionForm = this.formBuilder.group({
      charQ: ['', Validators.required],
      textQ: ['', Validators.required],
    });


    this.route.params.subscribe(params => {
      this.questionId = +params['id'];
    });


    this.questionService.findQuestionById(this.questionId).subscribe(
      (question: Question) => {
        this.question = question;
        this.updateQuestionForm.patchValue({
          charQ: question.charQ,
          textQ: question.textQ,

        });
      },
      error => {
        console.error('Error fetching question data:', error);
      }
    );
  }

  updateQuestion(): void {
    if (this.updateQuestionForm.valid) {
      const updatedQuestionData = this.updateQuestionForm.value;
      this.questionService.updateQuestion(this.questionId, updatedQuestionData).subscribe(
        (updatedQuestion) => {
          console.log('Question updated successfully:', updatedQuestion);
          alert('Question updated successfully');
          this.router.navigate(['/list-of-questions']);
        },
        (error: any) => {
          console.error('Error updating question:', error);
          alert('Error updating question. Please try again.');
        }
      );
    } else {
      console.error('Invalid form data. Cannot update question.');
      alert('Invalid form data. Please fill in all required fields.');
    }
  }
}

