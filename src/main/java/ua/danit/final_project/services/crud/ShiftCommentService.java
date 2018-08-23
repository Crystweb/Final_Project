package ua.danit.final_project.services.crud;


import ua.danit.final_project.entities.ShiftComment;

import java.util.List;

public interface ShiftCommentService {

  ShiftComment getById(Long id);

  List<ShiftComment> getAll();

  ShiftComment save(ShiftComment shiftComment);

  void deleteById(Long id);
}
