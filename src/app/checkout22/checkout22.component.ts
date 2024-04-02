import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrderService } from '../order.service';
import { OrderItemService } from '../order-item.service';
import { Router } from '@angular/router';
import { loadStripe, Stripe, StripeCardElement } from '@stripe/stripe-js';
import { StripeService } from '../stripe.service';

@Component({
  selector: 'app-checkout22',
  templateUrl: './checkout22.component.html',
  styleUrls: ['./checkout22.component.css']
})
export class Checkout22Component implements OnInit {
  checkoutForm: FormGroup;
  stripe: Stripe | null = null;
  card: StripeCardElement | null = null;
  iduser: number;
  clientSecret: any;
  
  

  constructor(
    private formBuilder: FormBuilder,
    private orderService: OrderService,
    private orderItemService: OrderItemService,
    private stripeService: StripeService,
    private router: Router
  ) { }
  async ngOnInit() {
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
        const userId = this.orderService.getUserIdFromLocalStorage();

        if (userId !== null ) {
          this.orderService.checkout(userId, paymentMethod.id).subscribe(
            (response) => {
              alert("Paiement réussi !");
              this.router.navigate(['/order']);
              console.log(response);
            },
            (error) => {
              console.error(error);
            }
          );
        }
      }}}}
