package ua.danit.final_project.services;

import ua.danit.final_project.entities.Position;
import ua.danit.final_project.entities.Schedule;
import ua.danit.final_project.entities.ShiftComment;
import ua.danit.final_project.entities.User;

import java.util.List;

public interface WorkCommentService {

  List<ShiftComment> getShiftCommentsByDate(Long miliseconds);

  ShiftComment addComment(ShiftComment shiftComment);

  void deleteComment(ShiftComment shiftComment, User userFromToken) throws IllegalAccessException;

  ShiftComment updateComment(ShiftComment shiftComment, User userFromToken) throws IllegalAccessException;

  ShiftComment getCommentById(Long commentId);

  List<Schedule> getCurrentSchedule();

  List<Position> getPositionByTitleIn(List<String> titles);
}