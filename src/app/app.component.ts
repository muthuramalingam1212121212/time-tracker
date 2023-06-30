import { Component, OnInit } from '@angular/core';
import { DataService } from './data-service.service';
import * as moment from 'moment';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  records: any[];
  totalSpentHours: any;
  totalSpend: any;
  taskName: string = ''
  modalBox: boolean = false
  constructor(private dataService: DataService) {
  }
  ngOnInit() {
    this.records = this.dataService.getRecords();  
    let totalHoursSpend = 0;
    let totalMinutesSpend = 0;
    let totalSecondsSpend = 0;
    
    // Iterate over the records array
    for (var i = 0; i < this.records.length; i++) {
      // Add the hoursSpend, minutesSpend, and secondsSpend values of the current record to the respective totals
      totalHoursSpend += this.records[i].hours;
      totalMinutesSpend += this.records[i].minutes;
      totalSecondsSpend += this.records[i].seconds;
    }
    
    // Perform necessary adjustments if the total seconds exceed 60 or the total minutes exceed 60
    totalMinutesSpend += Math.floor(totalSecondsSpend / 60);
    totalSecondsSpend = totalSecondsSpend % 60;
    totalHoursSpend += Math.floor(totalMinutesSpend / 60);
    totalMinutesSpend = totalMinutesSpend % 60;    
    
    this.totalSpend = ("0" + totalHoursSpend).slice(-2) + ":" + ("0" + totalMinutesSpend).slice(-2) + ":" + ("0" + totalSecondsSpend).slice(-2);

  } 
  addRecord(): void {
    if (this.taskName) {
      const payload = {
        taskName: this.taskName,
      }
      this.dataService.addRecord(payload);
      this.taskName = '';
      this.modalBox = false;
    }

  }
  deleteRecord(index: number): void {
    this.dataService.deleteRecord(index);
  }

  addModal() {
    this.modalBox = true;
  }
  closeModal() {
    this.modalBox = false;
  }

  startTimer(record: any) {
    this.dataService.startTimer(record);
  }

  stopTimer(record: any) {
    this.dataService.stopTimer(record);    
  }

}