import { Injectable } from '@angular/core';
import { ScormWrapperService } from 'ngx-scorm-wrapper';
import convertTotalSeconds from './timeConverter';

export interface ILMSData {
  score: number;
  location: string;
  completionStatus: 'complete' | 'incomplete';
  suspendData: object;
}

@Injectable()
export class LmsService {

  private readonly startTime: number;

  constructor(private scormWrapper: ScormWrapperService) {

    try {
      this.scormWrapper.doLMSInitialize(); // Try to find SCORM_API and initialize it
    } catch (err) {
      console.log('Cannot find LMS API');
    }

    if (!scormWrapper.LMSIsInitialized) {
      console.warn('LMS is not connected');
      return;
    } else {
      console.warn('LMS is connected');
      this.startTime = new Date().getTime();

      this.scormWrapper.doLMSSetValue('cmi.score.max', '100');
      this.scormWrapper.doLMSSetValue('cmi.location', '0:0'); // assume that the format is <chapter>:<page>
      this.scormWrapper.doLMSSetValue('cmi.session_time', this.sessionTime);
      this.scormWrapper.doLMSSetValue('cmi.completion_status', 'incomplete');
      this.commit();
    }
  }

  get apiVersion(): string {
    return this.scormWrapper.APIVersion;
  }

  get sessionTime(): string {
    if (this.startTime) {
      const currentTime = new Date().getTime();
      return convertTotalSeconds((currentTime - this.startTime) / 1000);
    }
    return '00:00:00.0';
  }

  get score(): number {
    if (this.scormWrapper.LMSIsInitialized) {
      const scaledScore = +this.scormWrapper.doLMSGetValue('cmi.score.scaled');
      const rawScore = +this.scormWrapper.doLMSGetValue('cmi.score.raw');

      return scaledScore * 100 || rawScore;
    }

    console.warn('LMS is not connected');
    return 0;
  }

  set score(score: number) {
    if (this.scormWrapper.LMSIsInitialized) {
      this.scormWrapper.doLMSSetValue('cmi.score.scaled', '' + score / 100);
      return;
    }
    console.warn('LMS is not connected');
  }

  public commit() {
    this.scormWrapper.doLMSCommit();
  }

  public terminate() {
    this.scormWrapper.doLMSFinish();
  }

  public getSuspendData(): any {
    if (!this.scormWrapper.LMSIsInitialized) {
      console.warn('LMS is not connected');
      return null;
    }

    const suspendData = this.scormWrapper.doLMSGetValue('cmi.suspend_data');
    if (suspendData) {
      return JSON.parse(suspendData as string);
    }

    return null;
  }


  public sendData(data: ILMSData): void {
    if (!this.scormWrapper.LMSIsInitialized) {
      console.warn('LMS is not connected');
      return null;
    }

    const { score, location, completionStatus, suspendData } = data;

    this.scormWrapper.doLMSSetValue('cmi.score.max', '100');
    this.scormWrapper.doLMSSetValue('cmi.location', location); // assume that the format is <chapter>:<page>
    this.scormWrapper.doLMSSetValue('cmi.session_time', this.sessionTime);
    this.scormWrapper.doLMSSetValue('cmi.completion_status', completionStatus);
    this.scormWrapper.doLMSSetValue('cmi.score.scaled', score / 100 + '');
    this.scormWrapper.doLMSSetValue('cmi.core.lesson_location', location);
    this.scormWrapper.doLMSSetValue('cmi.suspend_data', JSON.stringify(suspendData));
    this.commit();
  }

  public getData(): any {
    if (!this.scormWrapper.LMSIsInitialized) {
      console.warn('LMS is not connected');
      return null;
    }

    const suspendData = this.scormWrapper.doLMSGetValue('cmi.suspend_data');
    if (suspendData) {
      return JSON.parse(suspendData as string);
    }

    return null;
  }
}
