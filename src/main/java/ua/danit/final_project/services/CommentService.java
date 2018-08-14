package ua.danit.final_project.services;

import ua.danit.final_project.entities.Comment;

public interface CommentService {

  Comment addComment(Long uid, String message, Long workShiftId);

  Comment getLastComment();
}
