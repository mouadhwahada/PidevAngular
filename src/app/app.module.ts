import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { NgbModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { AddNewProductComponent } from './add-new-product/add-new-product.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { DetailsProductComponent } from './details-product/details-product.component';
import { ListProductComponent } from './list-product/list-product.component';
import { ListproductbackComponent } from './listproductback/listproductback.component';
import { ModalComponent } from './modal/modal.component';
import { ModallComponent } from './modall/modall.component';
import { OrderItemsShowComponent } from './order-items-show/order-items-show.component';
import { OrderItemsComponent } from './order-items/order-items.component';
import { OrderbackComponent } from './orderback/orderback.component';
import { Orderitem22Component } from './orderitem22/orderitem22.component';
import { PaymentComponent } from './payment/payment.component';
import { ProductssssComponent } from './productssss/productssss.component';
import { TrackComponent } from './track/track.component';
import { TryComponent } from './try/try.component';
import { UpdateproductComponent } from './updateproduct/updateproduct.component';
import { Checkout22Component } from './checkout22/checkout22.component';
import { ShopbackComponent } from './shopback/shopback.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { DemoComponent } from './demo/demo.component';
import { MedComponent } from './med/med.component';
// For pagination










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
    ListProductComponent,
    DetailsProductComponent,
    AddNewProductComponent,
    ListproductbackComponent,
    UpdateproductComponent,
    OrderItemsComponent,
    OrderItemsShowComponent,
    ModalComponent,
    TryComponent,
    TrackComponent,
    OrderbackComponent,
    ModallComponent,
    PaymentComponent,
    CheckoutComponent,
    ProductssssComponent,
    Orderitem22Component,
    Checkout22Component,
    ShopbackComponent,
    StatisticsComponent,
    DemoComponent,
    MedComponent,
    
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule,
    NgbPaginationModule,
    BrowserAnimationsModule,
  
  






    // Add MatPaginatorModule here




    



  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
