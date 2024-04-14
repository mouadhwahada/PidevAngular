import { Component } from '@angular/core';
import { QuizService } from 'src/app/MentalService/quiz.service';
import { Question } from 'src/app/mentalModels/Question';
import { Quiz } from 'src/app/mentalModels/QuizModel';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ViewChild } from '@angular/core';
import { ElementRef} from '@angular/core';

@Component({
  selector: 'app-quiz-client',
  templateUrl: './quiz-client.component.html',
  styleUrls: ['./quiz-client.component.css']
})
export class QuizClientComponent {
  quizzes: Quiz[] =[];
  questionsWithAnswers!: Question[];
  selectedQuiz: Quiz | null = null; 
  currentQuestionIndex: number = 0;
  selectedAnswerId: number | null = null;
  selectedAnswerIds: number[] = [];
  showResultFlag: boolean = false;
  quizScore: number = 0.0;
  scoreDescription: string = '';
  loading: boolean = false;
  showLoading: boolean = false;
  showCountdown: boolean = true;
  countdownNumber: number = 3;
  searchTerm: string = '';
  filteredQuizzes: Quiz[] = [];
  dataSource = new MatTableDataSource<Quiz>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  pagedQuizzes: Quiz[] = [];
  pageSize: number = 3; 
  pageSizeOptions: number[] = [3, 5, 10];
  userRating: number | null = null; 
  totalStars: number = 5;
  showPreview: boolean = true;
  selectedquiz: any;
  selectedMoodMap: Map<number, string> = new Map<number, string>();




  constructor(private quizService: QuizService, private elementRef: ElementRef) { }

  ngOnInit(): void {
    this.loadQuizzes();
    

  }

  loadQuizzes(): void {
    this.quizService.findAllQuizzes().subscribe(
      quizzes => {
        this.quizzes = quizzes;
        this.filteredQuizzes = this.filterQuizzes();
        this.onPageChange({ pageIndex: 0, pageSize: this.pageSize, length: this.filteredQuizzes.length });
      },
      error => {
        console.error('An error occurred while fetching questions:', error);
      }
    );
  }

  setUserRating(rating: number): void {
    this.userRating = rating;
    this.totalStars = rating;
}

getStarColor(index: number): string {
  return index <= this.userRating! ? '#fdd835' : '#ccc'; // Couleur jaune pour les étoiles sélectionnées, gris pour les autres
}

selectMood(mood: string, questionId: number): void {
  this.selectedMoodMap.set(questionId, mood);
}



  filterQuizzes(): Quiz[] {
    return this.quizzes.filter((quiz) =>
      quiz.titleQuiz.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      quiz.topicQuiz.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  onPageChange(event: PageEvent): void {
    const startIndex = event.pageIndex * event.pageSize; // Début de l'index pour chaque page
    const endIndex = startIndex + event.pageSize; // Fin de l'index pour chaque page
    this.pagedQuizzes = this.filteredQuizzes.slice(startIndex, endIndex);
  }

  onSearchTermChange(): void {
    // Mettez à jour filteredQuizzes avec les données filtrées
    this.filteredQuizzes = this.filterQuizzes();
    // Réinitialisez la pagination pour afficher les résultats filtrés sur la première page
    this.onPageChange({ pageIndex: 0, pageSize: this.pageSize, length: this.filteredQuizzes.length });
  }
  
    
  openQuiz() {
    this.countdownNumber = 3; // Réinitialise le compte à rebours à 3
    this.showCountdown = true; // Assurez-vous que showCountdown est true avant de commencer le compte à rebours
    this.startCountdown();
    
  }

  startCountdown() {
    let countdownInterval = setInterval(() => {
      if (this.countdownNumber > 0) {
        this.countdownNumber--;
      } else {
        clearInterval(countdownInterval);
        this.showCountdown = false;
        this.showQuizDetails(this.selectedQuiz!);
      }
    }, 1000);
  }

  showQuizDetails(quiz: Quiz): void {
    this.quizService.getQuestionsWithAnswersForQuiz(quiz.idQuiz).subscribe(
      (questions: Question[]) => {
        this.questionsWithAnswers = questions;
        this.selectedQuiz = quiz; 
        this.openQuizModal(); 
      },
      error => {
        console.error('Error fetching questions with answers:', error);
      }
    );
  }


  
  openQuizModal(): void {
    const modalElement = document.getElementById('quizModal');
    if (modalElement) {
      modalElement.classList.add('show'); // Ajoutez la classe 'show' pour afficher le modal
      modalElement.style.display = 'block'; // Affichez le modal en modifiant son style
    }
  }
  
  closeQuizModal(): void {
    const modalElement = document.getElementById('quizModal');
  if (modalElement) {
    modalElement.classList.remove('show'); 
    modalElement.style.display = 'none'; 
     // Réinitialiser les données du quiz
     this.quizScore = 0.0;
     this.selectedQuiz = null;
     this.currentQuestionIndex = 0;
     this.selectedAnswerId = null;
     this.showResultFlag = false;
     this.selectedAnswerIds = []; 
     this.userRating = null;
    
   
  
  }
}
nextQuestion(): void {
  if (this.currentQuestionIndex < this.questionsWithAnswers.length - 1) {
    this.currentQuestionIndex++;
  } else {
    // If reached the end of questions, close the modal
    this.closeQuizModal();
  }
}
previousQuestion(): void {
  if (this.currentQuestionIndex > 0) {
    // Retirer l'ID de la réponse sélectionnée de la liste des IDs sélectionnés
    this.selectedAnswerIds.pop();
    this.currentQuestionIndex--; 
    this.selectedAnswerId = null;
  }
}
selectAnswer(answerId: number): void {
  this.selectedAnswerId = answerId;
  console.log('Selected Answer ID:', this.selectedAnswerId);
   // Vérifiez si la réponse est déjà sélectionnée
   const index = this.selectedAnswerIds.indexOf(answerId);
   if (index !== -1) {
     // Si la réponse est déjà sélectionnée, retirez-la du tableau
     this.selectedAnswerIds.splice(index, 1);
   } else {
     // Sinon, ajoutez-la au tableau
     this.selectedAnswerIds.push(answerId);
   }
}
showResult(): void {
  this.showLoading = true;
  setTimeout(() => {
    this.showLoading = false;

 this.quizService.calculateQuizScore(this.selectedAnswerIds).subscribe(
   (score: number) => {
     this.quizScore = score;
     this.quizService.evaluateQuizScore(this.quizScore).subscribe(
       (result: string) => {
         this.scoreDescription = result;
         this.loading = false;
         this.showResultFlag = true;
       },
       (error: any) => {
         console.error('Error evaluating quiz score:', error);
         this.loading = false;
       }
     );
   },
   (error: any) => {
     console.error('Error calculating quiz score:', error);
     this.loading = false;
   }
 );
}, 3000);
}



isLastQuestion(): boolean {
  return this.currentQuestionIndex === this.questionsWithAnswers.length - 1;
}


retakeQuiz(): void {
  // Réinitialisez l'état du quiz pour revenir à la première question
  this.currentQuestionIndex = 0;
  this.selectedAnswerIds = [];
  this.quizScore = 0;
  this.scoreDescription = '';
  this.showResultFlag = false;
  this.userRating = null;
}

getCardColor(topic: string): string {
  // Logique pour retourner la couleur en fonction du sujet
  switch(topic.toLowerCase()) {
      case 'stress':
          return '#ffcccc'; // Rouge clair pour le sujet "stress"
      case 'anxiety':
          return '#ccffff'; // Bleu clair pour le sujet "anxiety"
      // Ajoutez d'autres cas pour d'autres sujets si nécessaire
      default:
          return '#f5f5f5'; // Couleur de fond par défaut
  }
}
previewQuiz(quiz: Quiz) {
  this.selectedQuiz = quiz;
  const modalElement: HTMLElement | null = this.elementRef.nativeElement.querySelector('#previewModal');
  if (modalElement) {
    modalElement.classList.add('show');
    modalElement.style.display = 'block';
    // Chargez les détails du quiz pour l'afficher dans le modal
    this.showPreviewDetails(quiz);
  }
}

showPreviewDetails(quiz: Quiz): void {
  this.quizService.getQuestionsWithAnswersForQuiz(quiz.idQuiz).subscribe(
    (questions: Question[]) => {
      this.questionsWithAnswers = questions;
      this.selectedQuiz = quiz; 
      // Ne pas ouvrir le modal ici, il sera ouvert dans previewQuiz()
    },
    error => {
      console.error('Error fetching questions with answers:', error);
    }
  );
}
closePreviewModal(): void {
  const modalElement: HTMLElement | null = document.getElementById('previewModal');
  if (modalElement) {
    modalElement.classList.remove('show'); // Supprime la classe 'show' pour masquer le modal
    modalElement.style.display = 'none'; // Cache le modal en modifiant son style
  }
}
}
