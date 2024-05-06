import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AllTemplateBackComponent } from './BackOffice/all-template-back/all-template-back.component';
import { NavbarBackComponent } from './BackOffice/navbar-back/navbar-back.component';
import { SidebarBackComponent } from './BackOffice/sidebar-back/sidebar-back.component';
import { FooterBackComponent } from './BackOffice/footer-back/footer-back.component';
import { AllTemplateFrontComponent } from './FrontOffice/all-template-front/all-template-front.component';
import { BodyFrontComponent } from './FrontOffice/body-front/body-front.component';
import { FooterFrontComponent } from './FrontOffice/footer-front/footer-front.component';
import { NavBarFrontComponent } from './FrontOffice/nav-bar-front/nav-bar-front.component';
import { PostsComponent } from './FrontOffice/posts/posts.component';
import { PostdetailsComponent } from './FrontOffice/postdetails/postdetails.component';
import {HttpClientModule} from "@angular/common/http";
import { AddpostComponent } from './FrontOffice/addpost/addpost.component';
import {FormsModule} from "@angular/forms";
import { MypostsComponent } from './FrontOffice/myposts/myposts.component';
import { UpdatePostDialogComponent } from './FrontOffice/update-post-dialog/update-post-dialog.component';
import { ImageuploadComponent } from './FrontOffice/imageupload/imageupload.component';
import { PostsadminComponent } from './BackOffice/postsadmin/postsadmin.component';
import { BadwordsComponent } from './BackOffice/badwords/badwords.component';
import {NgxPaginationModule} from "ngx-pagination";
import { ChatComponent } from './FrontOffice/chat/chat.component';

@NgModule({
  declarations: [
    AppComponent,
    AllTemplateBackComponent,
    NavbarBackComponent,
    SidebarBackComponent,
    FooterBackComponent,
    AllTemplateFrontComponent,
    BodyFrontComponent,
    FooterFrontComponent,
    NavBarFrontComponent,
    PostsComponent,
    PostdetailsComponent,
    AddpostComponent,
    MypostsComponent,
    UpdatePostDialogComponent,
    ImageuploadComponent,
    PostsadminComponent,
    BadwordsComponent,
    ChatComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
