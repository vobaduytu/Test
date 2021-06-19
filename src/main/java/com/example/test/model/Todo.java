package com.example.test.model;

import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.time.LocalDate;

@Entity
@Data
public class Todo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @NotBlank(message = "Cannot be left blank")
    private String name;

    private LocalDate startDate;

    private LocalDate endDate;

    private String status;

    @Override
    public String toString() {
        return "Todo{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", startDate=" + startDate +
                ", endDate=" + endDate +
                ", status='" + status + '\'' +
                '}';
    }
}
