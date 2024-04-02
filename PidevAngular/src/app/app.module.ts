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
import { FNavbarComponent } from './Front/Fnavbar/fnavbar.component';
import { FFooterComponent } from './Front/FFooter/ffooter.component';
import { HeaderComponent } from './Front/header/header.component';
import { SectionComponent } from './Front/Section/section.component';
import { AllTemplateBackComponent } from './BackOffice/all-template-back/all-template-back.component';
import { AllFrontComponent } from './Front/AllFront/all-front.component';
import { AddQuestionComponent } from './MentalComponents/add-question/add-question.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddAnswerComponent } from './MentalComponents/add-answer/add-answer.component';
import { AddQuizComponent } from './MentalComponents/add-quiz/add-quiz.component';
import { ROUTES, RouterModule } from '@angular/router';
import { UpdateAnswerComponent } from './MentalComponents/update-answer/update-answer.component';
import { UpdateQuestionComponent } from './MentalComponents/update-question/update-question.component';
import { UpdateQuizComponent } from './MentalComponents/update-quiz/update-quiz.component';






@NgModule({
  declarations: [
    AppComponent,
    FNavbarComponent,
    FFooterComponent,
    HeaderComponent,
    SectionComponent,
    AllTemplateBackComponent,
    FooterBackComponent,
    NavbarBackComponent,
    SidebarBackComponent,
    QuestionComponent,
    AnswerComponent,
    QuizComponent,
    AllFrontComponent,
    AddQuestionComponent,
    AddAnswerComponent,
    AddQuizComponent,
    UpdateAnswerComponent,
    UpdateQuestionComponent,
    UpdateQuizComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    
    
  ],
  providers: [],
  bootstrap: [AppComponent],
  
})
export class AppModule { }
