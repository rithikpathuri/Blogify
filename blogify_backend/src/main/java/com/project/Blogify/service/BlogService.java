package com.project.Blogify.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.project.Blogify.model.*;
import com.project.Blogify.repository.*;

import java.util.List;

@Service
public class BlogService {

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private PostRepository postRepo;

    @Autowired
    private CommentRepository commentRepo;

    // REGISTER
    public User register(User u){
        return userRepo.save(u);
    }

    // LOGIN
    public User login(String email, String password){
        return userRepo.findByEmailAndPassword(email, password);
    }

    // ADD POST
    public Post addPost(Post p){
        return postRepo.save(p);
    }

    // GET POSTS
    public List<Post> getPosts(){
        return postRepo.findAll();
    }

    // DELETE POST ✅
    public void deletePost(int id){
        postRepo.deleteById(id);
    }

    // UPDATE POST
    public Post updatePost(Post p){
        return postRepo.save(p);
    }

    // COMMENTS
    public Comment addComment(Comment c){
        return commentRepo.save(c);
    }

    public List<Comment> getComments(int postId){
        return commentRepo.findByPostId(postId);
    }
}