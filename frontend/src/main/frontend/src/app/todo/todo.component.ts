import { Component, OnInit } from '@angular/core';
import { Todo } from "./todo.model";

@Component({
  selector: 'todos',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

    todos: Todo[];
    
  constructor() { }

  ngOnInit() {
  }

}
