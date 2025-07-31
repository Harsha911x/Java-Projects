package com.example.JPADemo.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

@Component
@Scope("prototype")
@Entity
public class Student {

    @Id
    private int usn;
    private String name;
    private int marks;


    public Student() {
        // No-arg constructor required by JPA
    }

    public Student(int usn, String name, int marks) {
        this.usn = usn;
        this.name = name;
        this.marks = marks;
    }

    public int getUsn() {
        return usn;
    }

    public void setUsn(int usn) {
        this.usn = usn;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getMarks() {
        return marks;
    }

    public void setMarks(int marks) {
        this.marks = marks;
    }

    @Override
    public String toString() {
        return "Student{" +
                "usn=" + usn +
                ", name='" + name + '\'' +
                ", marks=" + marks +
                '}';
    }


}
