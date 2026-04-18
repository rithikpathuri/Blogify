package com.project.Blogify.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.project.Blogify.model.Comment;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Integer> {

    List<Comment> findByPostId(int postId);
}