package ua.danit.final_project.services.crud;

import ua.danit.final_project.entities.TaskComment;

import java.util.List;

public interface TaskCommentService {

  TaskComment getById(Long id);

  List<TaskComment> getAll();

  TaskComment save(TaskComment taskComment);

  void deleteById(Long id);
}
