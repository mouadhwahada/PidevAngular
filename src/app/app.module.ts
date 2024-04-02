import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterBackComponent } from './BackOffice/footer-back/footer-back.component';
import { NavbarBackComponent } from './BackOffice/navbar-back/navbar-back.component';
import { SidebarBackComponent } from './BackOffice/sidebar-back/sidebar-back.component';
import { HttpClientModule } from '@angular/common/http';
import { QuestionComponent } from './MentalComponents/question/question.component';
import { AnswerComponent } from './MentalComponents/answer/answer.component';
import { QuizComponent } from './MentalComponents/quiz/quiz.component';
import { AllTemplateBackComponent } from './BackOffice/all-template-back/all-template-back.component';
import { AddQuestionComponent } from './MentalComponents/add-question/add-question.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddAnswerComponent } from './MentalComponents/add-answer/add-answer.component';
import { AddQuizComponent } from './MentalComponents/add-quiz/add-quiz.component';
import { ROUTES, RouterModule } from '@angular/router';
import { UpdateAnswerComponent } from './MentalComponents/update-answer/update-answer.component';
import { UpdateQuestionComponent } from './MentalComponents/update-question/update-question.component';
import { UpdateQuizComponent } from './MentalComponents/update-quiz/update-quiz.component';
import { NoteComponent } from './MentalComponents/note/note.component';
import { AddNoteComponent } from './MentalComponents/add-note/add-note.component';
import { UpdateNoteComponent } from './MentalComponents/update-note/update-note.component';
import { ShowComponent } from './MentalComponents/show/show.component';
import { AllTemplateFrontComponent } from './FrontOffice/all-template-front/all-template-front.component';
import { BodyFrontComponent } from './FrontOffice/body-front/body-front.component';
import { NavBarFrontComponent } from './FrontOffice/nav-bar-front/nav-bar-front.component';
import { FooterFrontComponent } from './FrontOffice/footer-front/footer-front.component';
import { QuizClientComponent } from './MentalComponents/quiz-client/quiz-client.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule } from '@angular/material/paginator';
import { QuizNotifyComponent } from './MentalComponents/quiz-notify/quiz-notify.component';
import { ToastrModule } from 'ngx-toastr';
import { RatingComponent } from './MentalComponents/rating/rating.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';







@NgModule({
  declarations: [
    AppComponent,
    AllTemplateBackComponent,
    FooterBackComponent,
    NavbarBackComponent,
    SidebarBackComponent,
    QuestionComponent,
    AnswerComponent,
    QuizComponent,
    AddQuestionComponent,
    AddAnswerComponent,
    AddQuizComponent,
    UpdateAnswerComponent,
    UpdateQuestionComponent,
    UpdateQuizComponent,
    NoteComponent,
    AddNoteComponent,
    UpdateNoteComponent,
    ShowComponent,
    AllTemplateFrontComponent,
    BodyFrontComponent,
    NavBarFrontComponent,
    FooterFrontComponent,
    QuizClientComponent,
    QuizNotifyComponent,
    RatingComponent,
  
   
    

    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    BrowserAnimationsModule,
    MatPaginatorModule,
    ToastrModule.forRoot(),
    [MatIconModule],
    MatTableModule,
    MatButtonModule,
    MatFormFieldModule,
    CommonModule,
    MatInputModule
    
    
    
    
  ],
  providers: [],
  bootstrap: [AppComponent],
  
})
export class AppModule { }
