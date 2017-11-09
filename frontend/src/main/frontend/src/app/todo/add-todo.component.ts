import { Component, OnInit } from '@angular/core';
import { Todo } from "./todo.model";

@Component({
  selector: 'add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.css']
})
export class AddTodoComponent implements OnInit {

    todo: Todo = {};

  constructor() { }

  ngOnInit() {
  }
  
  save() {
      
  }

}
