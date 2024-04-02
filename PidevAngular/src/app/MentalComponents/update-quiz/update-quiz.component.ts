import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from 'src/app/MentalService/quiz.service';
import { Quiz } from 'src/app/mentalModels/QuizModel';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.css']
})
export class UpdateQuizComponent {
  updateQuizForm!: FormGroup;
  quizId!: number;
  quiz!: Quiz;

  constructor(private formBuilder: FormBuilder, private quizService: QuizService,
    private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.updateQuizForm = this.formBuilder.group({
      titleQuiz: ['', Validators.required],
      topicQuiz: ['', Validators.required],
      // Ajoutez d'autres champs de formulaire si nécessaire
    });

    // Récupération de l'identifiant du quiz à mettre à jour à partir de l'URL
    this.route.params.subscribe(params => {
      this.quizId = +params['id'];
    });

    // Récupération des données du quiz à mettre à jour
    this.quizService.findQuizById(this.quizId).subscribe(
      (quiz: Quiz) => {
        this.quiz = quiz;
        // Initialisation du formulaire avec les données du quiz à mettre à jour
        this.updateQuizForm.patchValue({
          titleQuiz: quiz.titleQuiz,
          topicQuiz: quiz.topicQuiz,
          // Autres champs de formulaire si nécessaire
        });
      },
      error => {
        console.error('Error fetching quiz data:', error);
        // Gérer l'erreur
      }
    );
  }

  updateQuiz(): void {
    if (this.updateQuizForm.valid) {
      const updatedQuizData = this.updateQuizForm.value;
      this.quizService.updateQuiz(this.quizId, updatedQuizData).subscribe(
        (updatedQuiz) => {
          console.log('Quiz updated successfully:', updatedQuiz);
          // Afficher une alerte pour indiquer que la mise à jour a réussi
          alert('Quiz updated successfully');
          // Réactualisez la liste des quiz après la mise à jour
          // Vous pouvez rediriger l'utilisateur vers la page de liste des quiz ici
          this.router.navigate(['/list-of-quizzes']);
        },
        (error: any) => {
          console.error('Error updating quiz:', error);
          // Afficher une alerte en cas d'erreur
          alert('Error updating quiz. Please try again.');
        }
      );
    } else {
      console.error('Invalid form data. Cannot update quiz.');
      // Afficher une alerte si les données du formulaire sont invalides
      alert('Invalid form data. Please fill in all required fields.');
    }
  }

}
