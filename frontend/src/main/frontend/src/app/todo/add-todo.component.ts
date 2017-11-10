import { Component, OnInit } from '@angular/core';
import { Todo } from "./todo.model";
import { TodoService } from "./todo.service";
import { Observable } from "rxjs/Observable";
import { TodoCreatedNotificationService } from "./todo-created-notification.service";

@Component({
  selector: 'add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.css']
})
export class AddTodoComponent implements OnInit {

    todo: Todo = {completed:false};

  constructor(private todoService: TodoService,
              private todoCreatedNotificationService: TodoCreatedNotificationService) { }

  ngOnInit() {
  }
  
  save() {
      this.subscribeToSaveResponse(this.todoService.create(this.todo));
  }
  
  private subscribeToSaveResponse(result: Observable<Todo>) {
      result.subscribe((res: Todo) =>
          this.onSaveSuccess(res), (res: Response) => this.onSaveError());
  }
  
  private onSaveSuccess(result: Todo) {
      console.log('todo saved successfully');
      this.clear();
      this.todoCreatedNotificationService.emitChange(true);
  }

  private onSaveError() {
      console.error('could not save the todo');
  }
  
  clear() {
      this.todo = {completed:false};
  }
}
