import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllTemplateBackComponent } from './BackOffice/all-template-back/all-template-back.component';
import { AllTemplateFrontComponent } from './FrontOffice/all-template-front/all-template-front.component';
import {PostsComponent} from "./FrontOffice/posts/posts.component";
import {AddpostComponent} from "./FrontOffice/addpost/addpost.component";
import {PostdetailsComponent} from "./FrontOffice/postdetails/postdetails.component";
import {ImageuploadComponent} from "./FrontOffice/imageupload/imageupload.component";
import {MypostsComponent} from "./FrontOffice/myposts/myposts.component";
import {PostsadminComponent} from "./BackOffice/postsadmin/postsadmin.component";


const routes: Routes = [
  {
    path:"admin",
    component : AllTemplateBackComponent
  },
  {
    path:"postsadmin",
    component : PostsadminComponent
  },
  {path:"posts",
    component: PostsComponent
  },
  {path:"myposts",
    component: MypostsComponent
  },
  {path:"addpost",
    component: AddpostComponent
  },
  {path:"post/uploadimages/:id",
    component: ImageuploadComponent
  },
  {path:"post/:id",
    component: PostdetailsComponent
  },
  {path:"",
  component: AllTemplateFrontComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
