import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Subject } from 'rxjs/internal/Subject';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notificationSubject = new BehaviorSubject<string>('');

  constructor() { }

  getNotification(): BehaviorSubject<string> {
    return this.notificationSubject;
  }

  sendNotification(message: string): void {
    this.notificationSubject.next(message);
  }
}
