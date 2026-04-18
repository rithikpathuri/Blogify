package com.project.Blogify.controller;


import com.project.Blogify.model.*;
import com.project.Blogify.repository.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/api")
public class CommentController {

    @Autowired
    private CommentRepository commentRepo;

    @Autowired
    private UserRepository userRepo;

    // ➕ ADD COMMENT (WITH USER NAME)
    @PostMapping("/comments")
    public Comment addComment(@RequestBody Comment comment) {

        User user = userRepo.findById(comment.getUserId()).orElse(null);

        if (user != null) {
            comment.setUserName(user.getName()); // ✅ store name
        }

        return commentRepo.save(comment);
    }

    // 📥 GET COMMENTS BY POST ID
    @GetMapping("/comments/{postId}")
    public List<Comment> getComments(@PathVariable int postId) {
        return commentRepo.findByPostId(postId);
    }
}
