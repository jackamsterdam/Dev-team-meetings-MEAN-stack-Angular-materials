import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MeetingModel } from 'src/app/models/meeting.model';

@Component({
  selector: 'app-meeting-card',
  templateUrl: './meeting-card.component.html',
  styleUrls: ['./meeting-card.component.scss']
})
export class MeetingCardComponent {
  @Input()
 meeting: MeetingModel

@Output()
deleteMe = new EventEmitter<string>()

deleteMeeting(_id: string) {
  this.deleteMe.emit(_id)
}


getMeetingDurationHours(start: Date, end: Date):number {
  const startDate = new Date(start);
  const endDate = new Date(end);
  let diff = startDate.valueOf() - endDate.valueOf();
  let diffInHours = Math.abs(diff) / 1000 / 60 / 60; // Convert milliseconds to hours
  return diffInHours
}
}
