import { Component, OnInit } from '@angular/core';
import { Todo } from "./todo.model";
import { ResponseWrapper } from "../shared/response-wrapper.model";
import { TodoService } from "./todo.service";
import { TodoCreatedNotificationService } from "./todo-created-notification.service";

@Component({
    selector: 'todos',
    templateUrl: './todo.component.html',
    styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
    
    todos: Todo[];
completed: string;

constructor(private todoService: TodoService,
        private todoCreatedNotificationService: TodoCreatedNotificationService) { }

ngOnInit() {
    this.loadAll();
    this.todoCreatedNotificationService.getEvent().subscribe(
            (todoCreated: boolean) => {
                if(todoCreated) {
                    this.loadAll();
                }
            }
    )
}

loadAll() {
    this.todoService.query().subscribe(
            (res: ResponseWrapper) => {
                this.todos = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
    );
}

delete(todo: Todo) {
    this.todoService.delete(todo.id).subscribe(
            (response) => {
                this.loadAll();
            })
}

update(todo) {
    this.todoService.update(todo).subscribe((res: Todo) =>
    { console.log('todo updated') }, (res: Response) => { console.log('error when updating todo') });
}

filterTodos() {
    if(this.completed == "null") {
        this.loadAll();
    } else {
        this.todoService.getByQuery({completed: this.completed == "true"}).subscribe(
                (res: ResponseWrapper) => {
                    this.todos = res.json;
                },
                (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    
}

private onError(error) {
    console.log(error);
}

}
