package com.example.test.service;

import com.example.test.model.Todo;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

public interface TodoService {
    Page<Todo> showAll(Pageable pageable);

    Optional<Todo> findById(Long id);

    Todo save(Todo todo);

    void delete(Long id);
}
