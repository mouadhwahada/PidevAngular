import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AnswerService } from 'src/app/MentalService/answer.service';
import { Answer } from 'src/app/mentalModels/AnswerModel';

@Component({
  selector: 'app-update-answer',
  templateUrl: './update-answer.component.html',
  styleUrls: ['./update-answer.component.css']
})
export class UpdateAnswerComponent {
  updateAnswerForm!: FormGroup;
  answerId!: number;
  answer!: Answer;

  constructor(private formBuilder: FormBuilder, private answerService: AnswerService,
    private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.updateAnswerForm = this.formBuilder.group({
      score: ['', Validators.required],
      textAnswer: ['', Validators.required],
      // Ajoutez d'autres champs de formulaire si nécessaire
    });

    // Récupération de l'identifiant de la réponse à mettre à jour à partir de l'URL
    this.route.params.subscribe(params => {
      this.answerId = +params['id'];
    });

    // Récupération des données de la réponse à mettre à jour
    this.answerService.findAnswerById(this.answerId).subscribe(
      (answer: Answer) => {
        this.answer = answer;
        // Initialisation du formulaire avec les données de la réponse à mettre à jour
        this.updateAnswerForm.patchValue({
          score: answer.score,
          textAnswer: answer.textAnswer,
          // Autres champs de formulaire si nécessaire
        });
      },
      error => {
        console.error('Error fetching answer data:', error);
        // Gérer l'erreur
      }
    );
  }

  updateAnswer(): void {
    if (this.updateAnswerForm.valid) {
      const updatedAnswerData = this.updateAnswerForm.value;
      this.answerService.updateAnswer(this.answerId, updatedAnswerData).subscribe(
        (updatedAnswer) => {
          console.log('Answer updated successfully:', updatedAnswer);
          // Afficher une alerte pour indiquer que la mise à jour a réussi
          alert('Answer updated successfully');
          // Réactualisez la liste des réponses après la mise à jour
          // Vous pouvez rediriger l'utilisateur vers la page de liste des réponses ici
          this.router.navigate(['/list-of-answers']);
        },
        (error: any) => {
          console.error('Error updating answer:', error);
          // Afficher une alerte en cas d'erreur
          alert('Error updating answer. Please try again.');
        }
      );
    } else {
      console.error('Invalid form data. Cannot update answer.');
      // Afficher une alerte si les données du formulaire sont invalides
      alert('Invalid form data. Please fill in all required fields.');
    }
  }

}
