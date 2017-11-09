import { Component, OnInit } from '@angular/core';
import { Todo } from "./todo.model";
import { TodoService } from "./todo.service";
import { Observable } from "rxjs/Observable";

@Component({
  selector: 'add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.css']
})
export class AddTodoComponent implements OnInit {

    todo: Todo = {};

  constructor(private todoService: TodoService) { }

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
      
  }

  private onSaveError() {
  }

}
