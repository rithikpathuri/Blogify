package com.project.Blogify.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import com.project.Blogify.model.*;

public interface UserRepository extends JpaRepository<User, Integer> {
    User findByEmailAndPassword(String email, String password);
}