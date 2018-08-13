package ua.danit.final_project.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import ua.danit.final_project.entities.Comment;
import ua.danit.final_project.services.CommentService;


@RestController
@RequestMapping(value = "/comment")
public class CommentController {

  private final CommentService commentService;

  @Autowired
  public CommentController(CommentService commentService) {
    this.commentService = commentService;
  }

  @PostMapping
  public Comment addComment(@RequestParam("uid") Long uid,
                            @RequestParam("message") String message,
                            @RequestParam("workshift") Long workShiftId) {
    return commentService.addComment(uid, message, workShiftId);
  }

  @GetMapping
  public Comment getLast() {
    return commentService.getLastComment();
  }
}

