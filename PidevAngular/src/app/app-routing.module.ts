import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { AllTemplateBackComponent } from './BackOffice/all-template-back/all-template-back.component';
import { AllFrontComponent } from './Front/AllFront/all-front.component';
import { QuestionComponent } from './MentalComponents/question/question.component';
import { AddQuestionComponent } from './MentalComponents/add-question/add-question.component';
import { AddAnswerComponent } from './MentalComponents/add-answer/add-answer.component';
import { AddQuizComponent } from './MentalComponents/add-quiz/add-quiz.component';
import { AnswerComponent } from './MentalComponents/answer/answer.component';
import { QuizComponent } from './MentalComponents/quiz/quiz.component';
import { UpdateQuestionComponent } from './MentalComponents/update-question/update-question.component';
import { UpdateAnswerComponent } from './MentalComponents/update-answer/update-answer.component';
import { UpdateQuizComponent } from './MentalComponents/update-quiz/update-quiz.component';




const routes: Routes = [
  { path: '', component: AllFrontComponent }, 
  
  { path: 'Admin', component: AllTemplateBackComponent},
  { path: 'listQuestion', component: QuestionComponent},
  { path: 'listAnswer', component: AnswerComponent},
  { path: 'listQuiz', component: QuizComponent},
  { path: 'addQuestion', component: AddQuestionComponent},
  { path: 'addAnswer', component: AddAnswerComponent},
  { path: 'addQuiz', component: AddQuizComponent},
  { path: 'updateQuestion/:id', component: UpdateQuestionComponent},
  { path: 'updateAnswer/:id', component: UpdateAnswerComponent},
  { path: 'updateQuiz/:id', component: UpdateQuizComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
