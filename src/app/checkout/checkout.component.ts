import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrderService } from '../order.service';
import { OrderItemService } from '../order-item.service';
import { Router } from '@angular/router';
import { loadStripe, Stripe, StripeCardElement } from '@stripe/stripe-js';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  checkoutForm: FormGroup;
  stripe: Stripe | null = null;
  card: StripeCardElement | null = null;
  iduser: number;

  constructor(
    private formBuilder: FormBuilder,
    private OrderService: OrderService,
    private orderItemService: OrderItemService,
    private router: Router
  ) { }

  async ngOnInit() {
    this.iduser = this.orderItemService.getUserIdFromLocalStorage();
    console.log(this.iduser);

    this.checkoutForm = this.formBuilder.group({
      name: ['', Validators.required],
      cardNumber: ['', Validators.required],
      expirationDate: ['', Validators.required],
      cvv: ['', Validators.required]
    });

    this.stripe = await loadStripe('pk_test_51OEyQhF3a3Tx6zK5KA1NHhf2T0Xa0qlaN2hLEmJ38PlOfsuD1aDnM41kX96YU1I3jfk53ZxAqMbL0Ts7WdX9QqSU00jHTAjOzi');

    if (this.stripe) {
      const elements = this.stripe.elements();
      this.card = elements.create('card');
      this.card.mount('#card-element');
    }
  }

  async onSubmit() {
    if (this.stripe && this.card) {
      const { paymentMethod, error } = await this.stripe.createPaymentMethod({
        type: 'card',
        card: this.card,
      });
  
      if (error) {
        console.error(error);
      } else if (paymentMethod) {
        if (this.iduser) {
          const paymentMethodId = paymentMethod.id;
  
          // Appeler le service pour effectuer le paiement
          this.OrderService.checkout(this.iduser, paymentMethodId).subscribe(
            (response) => {
              alert("Paiement réussi!");
              this.router.navigate(['/track'], { queryParams: { orderId: response.idOrder } });
              console.log(response);
            },
            (error) => {
              console.error(error);
              alert("Une erreur est survenue lors du traitement du paiement. Veuillez réessayer plus tard.");
            }
          );
        }
      }
    }
  }
}
