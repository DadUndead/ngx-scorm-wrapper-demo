import { Component } from '@angular/core';
import { LmsService } from './lms.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public title = 'ngx-scorm-wrapper-demo';
  public score = 0;
  public readonly maxScore = 100;
  public readonly minScore = 0;
  public readonly apiVersion: string = 'not found';

  constructor(private lmsService: LmsService) {
    this.apiVersion = lmsService.apiVersion;
    this.score = lmsService.score;
  }

  public changeScore(score: number) {
    if (score >= this.minScore && score <= this.maxScore) {
      this.score = score;
      this.lmsService.score = this.score;
    } else {
      this.score = score < this.minScore ? this.minScore : this.maxScore;
    }
  }

  public submitScore() {
    this.lmsService.commit(); // Finally saves data to LMS
    this.lmsService.terminate();
    window.close();
  }
}
