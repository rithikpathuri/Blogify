package com.project.Blogify.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.project.Blogify.model.*;
import com.project.Blogify.service.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin("*")
public class BlogController {

    @Autowired
    private BlogService service;

    // REGISTER
    @PostMapping("/register")
    public User register(@RequestBody User u){
        return service.register(u);
    }

    // LOGIN
    @PostMapping("/login")
    public User login(@RequestBody User u){
        return service.login(u.getEmail(), u.getPassword());
    }

    // ADD POST
    @PostMapping("/posts")
    public Post addPost(@RequestBody Post p){
        return service.addPost(p);
    }

    // GET POSTS
    @GetMapping("/posts")
    public List<Post> getPosts(){
        return service.getPosts();
    }

    // DELETE POST ✅
    @DeleteMapping("/posts/{id}")
    public String deletePost(@PathVariable int id){
        service.deletePost(id);
        return "Deleted Successfully";
    }

    // UPDATE POST (for edit button)
    @PutMapping("/posts/{id}")
    public Post updatePost(@PathVariable int id, @RequestBody Post p){
        p.setId(id);
        return service.updatePost(p);
    }
}