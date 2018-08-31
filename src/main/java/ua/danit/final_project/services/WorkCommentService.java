package ua.danit.final_project.services;

import ua.danit.final_project.entities.ShiftComment;

import java.util.List;

public interface WorkCommentService {

  List<ShiftComment> getShiftCommentsByDate(Long miliseconds, Long workShiftId);

  List<ShiftComment> getComments(Long workShiftId);

  ShiftComment addComment(Long  workShiftId, ShiftComment shiftComment);

  void deleteCommentById(Long commentId);

  ShiftComment updateComment(ShiftComment shiftComment);

  List<ShiftComment> getCommentsOfLastWorkShifts(Long workShiftId);

  ShiftComment getCommentById(Long commentId);
}