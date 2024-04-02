import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AnswerService } from 'src/app/MentalService/answer.service';
import { QuestionService } from 'src/app/MentalService/question.service';
import { Answer } from 'src/app/mentalModels/AnswerModel';
import { Question } from 'src/app/mentalModels/Question';

@Component({
  selector: 'app-add-answer',
  templateUrl: './add-answer.component.html',
  styleUrls: ['./add-answer.component.css']
})
export class AddAnswerComponent {
  answerForm!: FormGroup;
  questions: Question[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private answerService: AnswerService,
    private questionService: QuestionService
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.fetchQuestions();
  }

  initForm(): void {
    this.answerForm = this.formBuilder.group({
      score: ['', [Validators.required, Validators.min(0), Validators.max(100), Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      textAnswer: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(100)]],
      selectedQuestion: ['', Validators.required]
    });
  }

  fetchQuestions(): void {
    this.questionService.findAllQuestions().subscribe(
      (questions: Question[]) => {
        this.questions = questions;
      },
      (error) => {
        console.error('Error fetching questions:', error);
      }
    );
  }

  addAnswer(): void {
    if (this.answerForm.valid) {
      const { score, textAnswer, selectedQuestion } = this.answerForm.value;
      const selectedQuestionText: string = selectedQuestion.toString();
      const selectedQuestionObj: Question | undefined = this.questions.find(q => q.textQ === selectedQuestionText);
      if (selectedQuestionObj) {
        const newAnswer: Answer = {
          idAnswer: -1, // Assuming the backend generates the ID
          score,
          textAnswer,
          question: selectedQuestionObj
        };
        this.answerService.addAnswertoQuestion(selectedQuestionObj.textQ.toString(), newAnswer).subscribe(
          () => {
            this.answerForm.reset();
            alert('Answer added successfully!');
          },
          (error) => {
            console.error('Error adding answer:', error);
            alert('Failed to add answer!');
          }
        );
      } else {
        console.error('Selected question not found.');
        alert('Selected question not found.');
      }
    } else {
      alert('Please fill all required fields!');
    }
  }
  
  
}


