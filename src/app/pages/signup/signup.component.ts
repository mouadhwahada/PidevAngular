import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit{

  json: { username: string; password: string; firstname: string; lastname: string; email: string; phone: string; } | undefined;


  constructor(private userservice:UserService ,private snack:MatSnackBar){}

  public user ={
    username:'',
    password:'',
    firstname:'',
    lastname:'',
    email:'',
    phone:'',

  }

    ngOnInit():void {};

  formSubmit(){
console.log(this.user)
if(this.user.username=='' ||this.user.username==null){
  
 this.snack.open('Usernname is required !!!','', {
    duration:3000,
 
  });
  
 
  return;
} 

//addUser:userService
this.userservice.addUser(this.user).subscribe((data:any)=>{

  //success
  console.log(data);
  //alert('success');
  Swal.fire('Success done !!','user id is' + data.id ,'success');
},
(error) =>{
  console.log(error);
  //alert something wrong
 this.snack.open('something went wrong !!','', {
    duration:3000,
  });
}
)
};

}
  
