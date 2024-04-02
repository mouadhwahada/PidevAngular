import { Component, OnInit } from '@angular/core';
import { FoodService } from './services/food.service';
import { Food } from './models/Food';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
  foodForm: FormGroup | undefined;
  foods: Food[] | undefined;
  title = 'front';


  
}

