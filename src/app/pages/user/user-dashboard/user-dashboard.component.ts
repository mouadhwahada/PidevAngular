import { Component } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent {
  
  constructor(public login:LoginService){

  }

  NgOnInit():void{}

  isLoggedIn =false;
  user = null;


  ngOnInit():void{
    this.isLoggedIn=this.login.isLoggedIn();
    this.user = this.login.getUser();
  this.login.loginStatusSubject.asObservable().subscribe((data) => {
    this.isLoggedIn=this.login.isLoggedIn();
    this.user = this.login.getUser();

  })
  }
  public logout(){
    this.login.logout();
    window.location.reload();
   //this.login.loginStatusSubject.next(false);
  }

}
