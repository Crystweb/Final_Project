package ua.danit.final_project.services.crud;

import ua.danit.final_project.entities.DishComment;

import java.util.List;

public interface DishCommentService {

  DishComment getById(Long id);

  List<DishComment> getAll();

  DishComment save(DishComment dishComment);

  void deleteById(Long id);
}
