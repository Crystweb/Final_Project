package ua.danit.final_project.services;

import ua.danit.final_project.entities.ShiftComment;
import ua.danit.final_project.entities.WorkShift;

import java.sql.Timestamp;
import java.util.List;

public interface WorkCommentService {

  List<WorkShift> getWorkShiftsByDate(Timestamp date);

  List<ShiftComment> getComments(Long workShiftId);

  ShiftComment addComment(Long  workShiftId, ShiftComment shiftComment);

  void deleteCommentById(Long commentId);

  ShiftComment updateComment(ShiftComment shiftComment);

  List<ShiftComment> getCommentsOfLastWorkShifts();
}