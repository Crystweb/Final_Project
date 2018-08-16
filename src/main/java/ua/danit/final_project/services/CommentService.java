package ua.danit.final_project.services;

public interface CommentService {

  Comment addComment(Long uid, String message, Long workShiftId);

  Comment getLastComment();
}
