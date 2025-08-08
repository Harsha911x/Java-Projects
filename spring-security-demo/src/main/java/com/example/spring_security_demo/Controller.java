package com.example.spring_security_demo;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class Controller {

    @GetMapping("hello")
    public String greet(){
        return "Hello!!!!!!!!!!!!";
    }
}
