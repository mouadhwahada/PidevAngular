import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllTemplateBackComponent } from './BackOffice/all-template-back/all-template-back.component';
import { AllTemplateFrontComponent } from './FrontOffice/all-template-front/all-template-front.component';
import { AddNewProductComponent } from './add-new-product/add-new-product.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { DetailsProductComponent } from './details-product/details-product.component';
import { ListProductComponent } from './list-product/list-product.component';
import { ListproductbackComponent } from './listproductback/listproductback.component';
import { ModalComponent } from './modal/modal.component';
import { ModallComponent } from './modall/modall.component';
import { OrderItemsShowComponent } from './order-items-show/order-items-show.component';
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

const routes: Routes = [
  {
    path:"admin",
    component : AllTemplateBackComponent
  },
  {path:"",
  component: AllTemplateFrontComponent },

  { path: 'products', component: ListProductComponent },
  { path: 'addproduct', component: AddNewProductComponent },
  { path: 'productsback', component: ListproductbackComponent },
  { path: 'updateproduct/:id', component: UpdateproductComponent },
  { path: 'products/:idProduct', component: DetailsProductComponent }, // Route pour afficher les détails d'un produit spécifique
  { path: 'showorderitem', component: OrderItemsShowComponent },
  { path: 'try', component: TryComponent },
  { path: 'add', component: ModalComponent },
  { path: 'track', component: TrackComponent },
  { path:  'orderback', component: OrderbackComponent},
  { path:  'mod', component: ModallComponent},

  { path:  'pay', component: PaymentComponent},
  { path:  'checkout', component: CheckoutComponent},
  { path:  'products22', component: ProductssssComponent},

  { path:  'orderitem', component: Orderitem22Component},
  { path:  'checkout22', component: Checkout22Component},
  { path:  'shopback', component: ShopbackComponent},
  { path:  'stats', component: StatisticsComponent},
  { path:  'demo', component: DemoComponent},

  










];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
