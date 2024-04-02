import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, takeWhile, timer } from 'rxjs';
import { Exercise } from 'src/app/models/exercise.model';
import { ExerciseProgressService } from 'src/app/services/exercise-progress.service';
import { ExerciseService } from 'src/app/services/exercise.service';

@Component({
  selector: 'app-start-exercise',
  templateUrl: './start-exercise.component.html',
  styleUrls: ['./start-exercise.component.css']
})
export class StartExerciseComponent implements OnInit, OnDestroy {
  exercise!: Exercise;
  currentSet: number = 0;
  currentPhase: 'set' | 'rest' = 'set';
  countdown: number = 0;
  setDuration!: number;
  restDuration!: number;
  timerSubscription!: Subscription;
  showCompleteButton: boolean = false;
  intervalId!: any;
  exerciseId!: number;
  userId!: number; 

  constructor(
    private route: ActivatedRoute,
    private exerciseProgressService: ExerciseProgressService,
    private exerciseService: ExerciseService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.exerciseId = Number(this.route.snapshot.paramMap.get('id'));
    this.userId =1;
    this.exerciseService.getExerciseById(this.exerciseId).subscribe(data => {
      this.exercise = data;
      this.setDuration = Math.floor(((this.exercise.duration * 60) - (this.exercise.repo * (this.exercise.sets - 1))) / this.exercise.sets);
      this.restDuration = this.exercise.repo;
      this.initExercise();
    });
  }

  initExercise() {
    this.currentSet = 1;
    this.startPhase('set');
  }

  startPhase(phase: 'set' | 'rest') {
    this.currentPhase = phase;
    const duration = phase === 'set' ? this.setDuration : this.restDuration;
    this.countdown = duration;

    this.timerSubscription = timer(0, 1000).pipe(
      takeWhile(() => this.countdown > 0)
    ).subscribe(() => {
        this.countdown--;
        if (this.countdown === 0) {
          this.timerSubscription.unsubscribe();
          if (phase === 'set') {
            if (this.currentSet < this.exercise.sets) {
              this.startPhase('rest');
            } else {
              this.showCompleteButton = true;
            }
          } else {
            this.currentSet++;
            this.startPhase('set');
          }
        }
      });
  }

  completeExercise(): void {
    if (!this.userId || !this.exerciseId) {
      console.error('User ID or Exercise ID is missing');
      return;
    }

    this.exerciseProgressService.markExerciseAsCompleted2(this.userId, this.exerciseId).subscribe({
      next: () => {
        console.log('Exercise marked as completed successfully');
       
        this.router.navigateByUrl('/myworkouts');
      },
      error: (error) => {
        console.error('Failed to mark exercise as completed', error);
      }
    });
  }

  getImageUrl(filename: string): string {
    return `http://localhost:8070/files/get-image/${filename}`;
  }

  ngOnDestroy() {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }
}