package ua.danit.final_project.services.crud;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ua.danit.final_project.entities.TaskComment;
import ua.danit.final_project.repositories.TaskCommentRepository;

import javax.persistence.EntityNotFoundException;
import java.util.List;

@Service
public class TaskCommentServiceImpl implements TaskCommentService {

  private final TaskCommentRepository taskCommentRepository;

  @Autowired
  public TaskCommentServiceImpl(TaskCommentRepository taskCommentRepository) {
    this.taskCommentRepository = taskCommentRepository;
  }

  @Override
  public TaskComment getById(Long id) {
    return taskCommentRepository.findById(id).orElseThrow(EntityNotFoundException::new);
  }

  @Override
  public List<TaskComment> getAll() {
    return taskCommentRepository.findAll();
  }

  @Override
  public TaskComment save(TaskComment taskComment) {
    return taskCommentRepository.save(taskComment);
  }

  @Override
  public void deleteById(Long id) {
    taskCommentRepository.deleteById(id);
  }
}
