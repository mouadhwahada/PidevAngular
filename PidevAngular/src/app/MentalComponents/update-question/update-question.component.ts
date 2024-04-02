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
      // Ajoutez d'autres champs de formulaire si nécessaire
    });

    // Récupération de l'identifiant de la question à mettre à jour à partir de l'URL
    this.route.params.subscribe(params => {
      this.questionId = +params['id'];
    });

    // Récupération des données de la question à mettre à jour
    this.questionService.findQuestionById(this.questionId).subscribe(
      (question: Question) => {
        this.question = question;
        // Initialisation du formulaire avec les données de la question à mettre à jour
        this.updateQuestionForm.patchValue({
          charQ: question.charQ,
          textQ: question.textQ,
          // Autres champs de formulaire si nécessaire
        });
      },
      error => {
        console.error('Error fetching question data:', error);
        // Gérer l'erreur
      }
    );
  }

  updateQuestion(): void {
    if (this.updateQuestionForm.valid) {
      const updatedQuestionData = this.updateQuestionForm.value;
      this.questionService.updateQuestion(this.questionId, updatedQuestionData).subscribe(
        (updatedQuestion) => {
          console.log('Question updated successfully:', updatedQuestion);
          // Afficher une alerte pour indiquer que la mise à jour a réussi
          alert('Question updated successfully');
          // Réactualisez la liste des questions après la mise à jour
          // Vous pouvez rediriger l'utilisateur vers la page de liste des questions ici
          this.router.navigate(['/list-of-questions']);
        },
        (error: any) => {
          console.error('Error updating question:', error);
          // Afficher une alerte en cas d'erreur
          alert('Error updating question. Please try again.');
        }
      );
    } else {
      console.error('Invalid form data. Cannot update question.');
      // Afficher une alerte si les données du formulaire sont invalides
      alert('Invalid form data. Please fill in all required fields.');
    }
  }
}

