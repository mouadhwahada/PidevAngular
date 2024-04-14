import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExerciseCompletionService {
  private exerciseCompletedSource = new Subject<void>();

  exerciseCompleted$ = this.exerciseCompletedSource.asObservable();

  notifyExerciseCompleted() {
    this.exerciseCompletedSource.next();
  }
}