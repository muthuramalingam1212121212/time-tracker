import { Injectable } from '@angular/core';
import * as moment from 'moment';
@Injectable({
  providedIn: 'root'
})
export class DataService {
  private records: any[] = [];
  hours: number = 0;
  minutes: number = 0;
  seconds: number = 0;
  
  constructor() {
    // Load data from local storage or initialize with empty array
    const storedData = localStorage.getItem('records');
    this.records = storedData ? JSON.parse(storedData) : [];  
  }

  getRecords(): any[] {
    return this.records;
  }

  addRecord(record: any): void {      
    record.hours = 0;
    record.minutes = 0;
    record.seconds = 0;   
    record.timerActive = false;
    record.startTime = null; // Initialize the startTime property
    record.endTime = null; // Initialize the endTime property
    record.timerInterval = null; // Initialize the endTime property
    this.records.push(record);
    this.saveData();
  }

  deleteRecord(index: number): void {
    this.records.splice(index, 1);
    this.saveData();
  }
  startTime: number;
  endTime: number;
  duration
  timerInterval: any;
  startTimer(record: any): void {
    const item = this.records.find(item => item.taskName === record.taskName);
    if (item) {
      item.timerActive = true
      item.startTime = Date.now();
      item.timerInterval = setInterval(() => {
        item.seconds++;
        if (item.seconds === 60) {
          item.seconds = 0;
          item.minutes++;
        }
        if (item.minutes === 60) {
          item.minutes = 0;
          item.hours++;
        }
      }, 1000);
      this.saveData();
    }

  }

  stopTimer(record: any): void {
    const item = this.records.find(item => item.taskName === record.taskName);
    if (item) {
      item.timerActive = false;
      item.endTime = Date.now();
      clearInterval(item.timerInterval);      
      this.saveData();      
    }
  }

  private saveData(): void {
    // Save data to local storage
    localStorage.setItem('records', JSON.stringify(this.records));
  }
}