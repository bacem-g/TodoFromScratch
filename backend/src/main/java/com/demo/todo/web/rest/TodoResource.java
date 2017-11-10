package com.demo.todo.web.rest;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.demo.todo.domain.Todo;
import com.demo.todo.exception.EntityAlreadyExistException;
import com.demo.todo.service.TodoService;

@RestController
@RequestMapping("/api")
public class TodoResource {

    private final Logger log = LoggerFactory.getLogger(TodoResource.class);

    private final TodoService todoService;

    public TodoResource(TodoService todoService) {
        this.todoService = todoService;
    }
    
    @PostMapping("/todos")
    public ResponseEntity<Todo> createTodo(@RequestBody Todo todo) throws URISyntaxException, EntityAlreadyExistException {
        log.info("REST request to save Todo : {}", todo);
        if (todo.getId() != null) {
            throw new EntityAlreadyExistException();
        }
        Todo result = todoService.save(todo);
        return ResponseEntity.created(new URI("/api/todos/" + result.getId()))
            .body(result);
    }
    
    @PutMapping("/todos")
    public ResponseEntity<Todo> updateTodo(@RequestBody Todo todo) throws URISyntaxException, EntityAlreadyExistException {
        log.info("REST request to update Todo : {}", todo);
        if (todo.getId() == null) {
            return createTodo(todo);
        }
        Todo result = todoService.save(todo);
        return ResponseEntity.ok().body(result);
    }
    
    @GetMapping("/todos")
    public List<Todo> getAllTodos() {
        log.info("REST request to get all Todos");
        return todoService.findAll();
    }
    
    @GetMapping("/todos/{id}")
    public ResponseEntity<Todo> getTodo(@PathVariable Long id) {
        log.info("REST request to get Todo : {}", id);
        Todo todo = todoService.findOne(id);
        return Optional.ofNullable(todo).map(localTodo -> new ResponseEntity<>(todo, HttpStatus.OK)).orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
    
    @DeleteMapping("/todos/{id}")
    public ResponseEntity<Void> deleteTodo(@PathVariable Long id) {
        log.info("REST request to delete Todo : {}", id);
        todoService.delete(id);
        return ResponseEntity.ok().build();
    }
    
    @GetMapping("/todos/query")
    public List<Todo> getTodosByQuery(@RequestParam String completed) {
    	log.info("REST request to get all Todos by query {}", completed);
    	return todoService.findByQuery(Boolean.valueOf(completed));
    }
}
