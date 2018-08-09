package ua.danit.final_project.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import ua.danit.final_project.entities.Comment;
import ua.danit.final_project.services.CommentService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class CommentController {

  private final CommentService commentService;

  @Autowired
  public CommentController(CommentService commentService) {
    this.commentService = commentService;
  }

  @RequestMapping(value = "/comment", method = RequestMethod.POST)
  public Comment addComment(@RequestParam("uid") Long uid,
                            @RequestParam("message") String message) {
    return commentService.addComment(uid, message);
  }

  @RequestMapping(value = "/comment", method = RequestMethod.GET)
  public Comment getLast() {
    return commentService.getLastComment();
  }
}

