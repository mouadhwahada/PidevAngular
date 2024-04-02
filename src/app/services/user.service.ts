// user.service.ts

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
   private userId: number = 3;

  constructor() { }

  setUserId(userId: number): void {
    this.userId = userId;
  }

  getUserId(): number | undefined {
    return this.userId;
  }
}

