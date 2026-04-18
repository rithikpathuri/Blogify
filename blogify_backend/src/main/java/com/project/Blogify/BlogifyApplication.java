package com.project.Blogify;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class BlogifyApplication {

	public static void main(String[] args) {
		SpringApplication.run(BlogifyApplication.class, args);
		System.out.println("Application is running on port 8080. Open URL http://localhost:8080/");
	}

}
