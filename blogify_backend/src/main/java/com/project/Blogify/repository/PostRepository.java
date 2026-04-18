package com.project.Blogify.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.project.Blogify.model.Post;

public interface PostRepository extends JpaRepository<Post, Integer> {
}