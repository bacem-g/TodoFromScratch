import { Injectable } from '@angular/core';
import { Todo } from "./todo.model";
import { Observable } from "rxjs/Observable";
import { Http, Response, BaseRequestOptions, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map'
import { ResponseWrapper } from "../shared/response-wrapper.model";

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
    
    query(req?: any): Observable<ResponseWrapper> {
        return this.http.get(this.resourceUrl)
            .map((res: Response) => this.convertResponse(res));
    }
    
    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }
    
    update(todo: Todo): Observable<Todo> {
        const copy = this.convert(todo);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }
    
    getByQuery(todo: Todo) {
        const options: BaseRequestOptions = new BaseRequestOptions();
        const params: URLSearchParams = new URLSearchParams();
        options.params = params;
        params.set('completed', todo.completed.toString());
        return this.http.get(this.resourceUrl + '/query', options)
        .map((res: Response) => this.convertResponse(res));
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
    
    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        const result = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            result.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return new ResponseWrapper(res.headers, result, res.status);
    }
}
