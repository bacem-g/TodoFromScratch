package com.demo.todo.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.demo.todo.domain.Todo;
import com.demo.todo.repository.TodoRepository;

import java.util.List;

@Service
@Transactional
public class TodoService {

    private final Logger log = LoggerFactory.getLogger(TodoService.class);

    private final TodoRepository todoRepository;

    public TodoService(TodoRepository todoRepository) {
        this.todoRepository = todoRepository;
    }

    public Todo save(Todo todo) {
        log.debug("Request to save Todo : {}", todo);
        return todoRepository.save(todo);
    }

    @Transactional(readOnly = true)
    public List<Todo> findAll() {
        log.debug("Request to get all Todos");
        return todoRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Todo findOne(Long id) {
        log.debug("Request to get Todo : {}", id);
        return todoRepository.findOne(id);
    }

    public void delete(Long id) {
        log.debug("Request to delete Todo : {}", id);
        todoRepository.delete(id);
    }

	public List<Todo> findByQuery(boolean completed) {
		log.debug("Request to findByQuery Todo : {}", completed);
		//return todoRepository.findByQuery(completed);
		return null;
	}
}
