package com.example.JPADemo;

import com.example.JPADemo.model.Student;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;

@SpringBootApplication
public class JpaDemoApplication {

	public static void main(String[] args) {

		ApplicationContext context = SpringApplication.run(JpaDemoApplication.class, args);


		StudentRepo repo = context.getBean(StudentRepo.class);


		Student s1 = context.getBean(Student.class);
		Student s2 = context.getBean(Student.class);
		Student s3 = context.getBean(Student.class);

//		s1.setUsn(101);
//		s1.setName("Harshavardhan");
//		s1.setMarks(100);
//
//		s2.setUsn(102);
//		s2.setName("Harsha");
//		s2.setMarks(99);
//
//		s3.setUsn(103);
//		s3.setName("Vardhan");
//		s3.setMarks(90);
//
//
//		repo.save(s1);
//		repo.save(s2);
//		repo.save(s3);

		// repo.delete(s1);

		System.out.println(repo.findAll());
		System.out.println(repo.findById(102));

		System.out.println(repo.findByName("Harsha"));

	}

}
