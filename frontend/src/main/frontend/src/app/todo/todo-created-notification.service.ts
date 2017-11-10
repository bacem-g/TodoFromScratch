import { Injectable } from '@angular/core';
import { Subject } from "rxjs/Subject";
import { Observable } from "rxjs/Observable";

@Injectable()
export class TodoCreatedNotificationService {

  constructor() { }

  private todoCreated = new Subject<Boolean>();
  emitChange(change: boolean) {
      this.todoCreated.next(change);
  }
  
  getEvent(): Observable<Boolean> {
      return this.todoCreated.asObservable();
  }
}
