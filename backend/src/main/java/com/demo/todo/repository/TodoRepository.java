package com.demo.todo.repository;

import org.springframework.stereotype.Repository;

import com.demo.todo.domain.Todo;

import java.util.List;

import org.springframework.data.jpa.repository.*;

@Repository
public interface TodoRepository extends JpaRepository<Todo, Long> {

	@Query("select t from Todo t where t.completed = ?1")
	List<Todo> findByQuery(boolean completed);
}
