import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private snackBar: MatSnackBar) { }

  showNotification(message: string, action: string = 'Fermer', duration: number = 5000, panelClass: string[] = []): void {
    this.snackBar.open(message, action, {
      duration: duration,
      panelClass: panelClass
    });
  }
}

