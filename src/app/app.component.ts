import {Component} from '@angular/core';
import {interval} from 'rxjs';
import {takeWhile, tap} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  predefinedMinutes = [5, 10, 15, 30, 45, 60];

  maxMinutes     = 0;
  currentSeconds = 0;

  isRunning = false;

  /** Start the timer */
  public start(): void {
    this.isRunning = true;
    const _interval = interval(1000); // remind each 1 second

    _interval.pipe(
        takeWhile(_ => !this.isFinished ),
        tap(i => this.currentSeconds += 1) // increase up to 1 second
      ).subscribe();
  }

  /** finish timer */
  public finish(): void {
    this.currentSeconds = this._convertMinutesToSeconds(this.maxMinutes);
    this.isRunning = false;
  }

  /** reset timer */
  public reset(): void {
    this.currentSeconds = 0;
  }

  /** return max value in seconds */
  get maxSeconds(): number {
    return isNaN(this.maxMinutes) ? 0 : this._convertMinutesToSeconds(this.maxMinutes);
  }

  /** return current value in seconds */
  get currentVal(): number  {
    return isNaN(this.currentSeconds) || this.currentSeconds < 0 ? 0 : this.currentSeconds;
  }

  /** return true if timer reaches max values */
  get isFinished(): boolean {
    return this.currentVal > 0 && this.currentVal >= this.maxSeconds;
  }

  /** return retaining minutes */
  get retainMinutes(): number {
    return Math.floor(this._convertSecondsToMinutes(this.maxSeconds - this.currentSeconds));
  }

  /** return retaining seconds */
  get retainSeconds(): number {
    return (this.maxSeconds - this.currentSeconds) % 60;
  }


  private _convertSecondsToMinutes(seconds: number): number {
    return seconds / 60;
  }

  private _convertMinutesToSeconds(minutes: number): number {
    return minutes * 60;
  }
}
