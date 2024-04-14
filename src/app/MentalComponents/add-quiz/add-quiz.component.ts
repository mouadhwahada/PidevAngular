import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from 'src/app/MentalService/notification.service';
import { QuizService } from 'src/app/MentalService/quiz.service';
import { Quiz } from 'src/app/mentalModels/QuizModel';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent {
  quizForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private quizService: QuizService, private toastr: ToastrService,private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.quizForm = this.formBuilder.group({
      titleQuiz: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(50)]],
      topicQuiz: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(20)]]
    });
  }

  addQuiz(): void {
    if (this.quizForm.valid) {
      const newQuiz: Quiz = this.quizForm.value as Quiz;
      console.log('New Quiz:', newQuiz);
      this.quizService.addQuiz(newQuiz).subscribe(() => {
        this.quizForm.reset();
        alert('Quiz added successfully!');
      }, error => {
        console.error('Error adding quiz:', error);
        alert('Failed to add quiz!');
      });
    } else {
      alert('Please fill all required fields!');
    }
  }

  getTitleErrorMessage(): string {
    const titleControl = this.quizForm.get('titleQuiz');
     if (titleControl?.hasError('minlength')) {
      return 'Title must be at least 10 characters long.';
    } else if (titleControl?.hasError('maxlength')) {
      return 'Title cannot exceed 50 characters.';
    }
    return '';
  }

  getTopicErrorMessage(): string {
    const topicControl = this.quizForm.get('topicQuiz');
     if (topicControl?.hasError('minlength')) {
      return 'Topic must be at least 10 characters long.';
    } else if (topicControl?.hasError('maxlength')) {
      return 'Topic cannot exceed 20 characters.';
    }
    return '';
  }
}
