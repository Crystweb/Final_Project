package ua.danit.final_project.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ua.danit.final_project.entities.Comment;
import ua.danit.final_project.entities.User;
import ua.danit.final_project.repositories.CommentRepo;
import ua.danit.final_project.repositories.UserRepo;

import javax.persistence.EntityNotFoundException;
import java.sql.Timestamp;


@Service
public class CommentServiceImpl implements CommentService {

  private final CommentRepo commentRepo;
  private final UserRepo userRepo;

  @Autowired
  public CommentServiceImpl(CommentRepo commentRepo, UserRepo userRepo) {
    this.commentRepo = commentRepo;
    this.userRepo = userRepo;
  }

  @Override
  public Comment addComment(Long uid, String message) {
    User user = userRepo.findById(uid).orElseThrow(EntityNotFoundException::new);

    Comment comment = new Comment();
    comment.setUser(user);
    comment.setMessage(message);
    comment.setDate(new Timestamp(System.currentTimeMillis()));
    return commentRepo.save(comment);
  }

  @Override
  public Comment getLastComment() {
    return commentRepo.findLast();
  }
}
