import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { AllTemplateBackComponent } from './BackOffice/all-template-back/all-template-back.component';
import { QuestionComponent } from './MentalComponents/question/question.component';
import { AddQuestionComponent } from './MentalComponents/add-question/add-question.component';
import { AddAnswerComponent } from './MentalComponents/add-answer/add-answer.component';
import { AddQuizComponent } from './MentalComponents/add-quiz/add-quiz.component';
import { AnswerComponent } from './MentalComponents/answer/answer.component';
import { QuizComponent } from './MentalComponents/quiz/quiz.component';
import { UpdateQuestionComponent } from './MentalComponents/update-question/update-question.component';
import { UpdateAnswerComponent } from './MentalComponents/update-answer/update-answer.component';
import { UpdateQuizComponent } from './MentalComponents/update-quiz/update-quiz.component';
import { AddNoteComponent } from './MentalComponents/add-note/add-note.component';
import { UpdateNoteComponent } from './MentalComponents/update-note/update-note.component';
import { NoteComponent } from './MentalComponents/note/note.component';
import { ShowComponent } from './MentalComponents/show/show.component';
import { AllTemplateFrontComponent } from './FrontOffice/all-template-front/all-template-front.component';
import { QuizClientComponent } from './MentalComponents/quiz-client/quiz-client.component';
import { QuizNotifyComponent } from './MentalComponents/quiz-notify/quiz-notify.component';
import { QuizShowComponent } from './MentalComponents/quiz-show/quiz-show.component';
import { AcceuilMentalComponent } from './MentalComponents/acceuil-mental/acceuil-mental.component';






const routes: Routes = [
  { path: '', component: AllTemplateFrontComponent }, 
  
  { path: 'Admin', component: AllTemplateBackComponent},
  { path: 'listQuestion', component: QuestionComponent},
  { path: 'listAnswer', component: AnswerComponent},
  { path: 'listQuiz', component: QuizComponent},
  { path: 'listNote', component: NoteComponent},
  { path: 'addQuestion', component: AddQuestionComponent},
  { path: 'addAnswer', component: AddAnswerComponent},
  { path: 'addQuiz', component: AddQuizComponent},
  { path: 'addNote', component: AddNoteComponent},
  { path: 'updateQuestion/:id', component: UpdateQuestionComponent},
  { path: 'updateAnswer/:id', component: UpdateAnswerComponent},
  { path: 'updateQuiz/:id', component: UpdateQuizComponent},
  { path: 'updateNote/:id', component: UpdateNoteComponent},
  {path: 'quiz-details/:id', component:ShowComponent},
  {path: 'quiz-client', component:QuizClientComponent},
  {path: 'quiz-notify', component:QuizNotifyComponent},
  {path: 'show', component:ShowComponent},
  {path: 'show-quiz', component:QuizShowComponent},
  {path: 'acc', component:AcceuilMentalComponent}





];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
