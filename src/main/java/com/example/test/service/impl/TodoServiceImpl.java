package com.example.test.service.impl;

import com.example.test.model.Todo;
import com.example.test.repository.TodoRepository;
import com.example.test.service.TodoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class TodoServiceImpl implements TodoService {

    @Autowired
    private TodoRepository todoRepository;


    @Override
    public Page<Todo> showAll(Pageable pageable) {
        return todoRepository.findAll(pageable);
    }

    @Override
    public Optional<Todo> findById(Long id) {
        return todoRepository.findById(id);
    }

    @Override
    public Todo save(Todo todo) {
        return todoRepository.save(todo);
    }

    @Override
    public void delete(Long id) {
        todoRepository.deleteById(id);
    }
}
