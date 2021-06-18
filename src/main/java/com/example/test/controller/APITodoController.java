package com.example.test.controller;

import com.example.test.model.Todo;
import com.example.test.service.TodoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping(value = "/api/todos")
public class APITodoController {


    @Autowired
    private TodoService todoService;

    @GetMapping
    public ResponseEntity<?> showAll(@RequestParam(value = "page", required = false, defaultValue = "0") int page
    ) {
        try {
            Page<Todo> todo = todoService.showAll(PageRequest.of(page, 6, Sort.by("id").descending()));

            return new ResponseEntity<>(todo, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    @GetMapping(value = "/{id}")
    public ResponseEntity<?> findById(@PathVariable long id ) {
        try {
            Todo todo = todoService.findById(id).get();
            return new ResponseEntity<>(todo, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable long id) {
        try {
            todoService.delete(id);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    }

    @PutMapping(value = "/{id}")
    public ResponseEntity<Todo> update(@PathVariable("id") Long id, @RequestBody Todo todoUpdate) {
        Todo todo = todoService.findById(id).get();

        if (todo == null) {
            return new ResponseEntity<Todo>(HttpStatus.NOT_FOUND);
        }
        todoUpdate.setId(todo.getId());
        todoService.save(todoUpdate);
        return new ResponseEntity<>(todoUpdate, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Todo> create (@RequestBody Todo todo){
          todoService.save(todo);
          return new ResponseEntity<>(todo, HttpStatus.OK);
    }
}
