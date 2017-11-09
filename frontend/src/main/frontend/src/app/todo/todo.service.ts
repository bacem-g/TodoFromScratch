import { Injectable } from '@angular/core';
import { Todo } from "./todo.model";
import { Observable } from "rxjs/Observable";
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map'

@Injectable()
export class TodoService {
    
    private resourceUrl = 'api/todos';
    
    constructor(private http: Http) { }
    
    create(todo: Todo): Observable<Todo> {
        const copy = this.convert(todo);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }
    
    /**
     * Convert a Todo to a JSON which can be sent to the server.
     */
    private convert(todo: Todo): Todo {
        const copy: Todo = Object.assign({}, todo);
    return copy;
    }
    
    /**
     * Convert a returned JSON object to Todo.
     */
    private convertItemFromServer(json: any): Todo {
        const entity: Todo = Object.assign(new Todo(), json);
        return entity;
    }
}
