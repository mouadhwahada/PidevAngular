import { Component } from '@angular/core';
import { IndividualConfig, ToastrService } from 'ngx-toastr';
import { NotificationService } from 'src/app/MentalService/notification.service';

@Component({
  selector: 'app-quiz-notify',
  templateUrl: './quiz-notify.component.html',
  styleUrls: ['./quiz-notify.component.css']
})
export class QuizNotifyComponent {
  constructor(private toastr: ToastrService) { }

  showNotification(): void {
    const toastrConfig: Partial<IndividualConfig<any>> = {
      timeOut: 5000,
      enableHtml: true,
      tapToDismiss: false,
      progressBar: true,
      closeButton: true,
      positionClass: 'toast-top-right',
      extendedTimeOut: 2000,
      toastClass: 'ngx-toastr',
      titleClass: 'toast-title',
      messageClass: 'toast-message'
    };

    this.toastr.info(`<a href= "/quiz-client"> Clic Here</a> for more information.`, 'Many quizzes have been added', toastrConfig);
  }
  }


