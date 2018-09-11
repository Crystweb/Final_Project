package ua.danit.final_project.services.crud;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ua.danit.final_project.entities.Task;
import ua.danit.final_project.repositories.TaskRepository;

import javax.persistence.EntityNotFoundException;
import java.util.List;

@Service
public class TaskServiceCrudImpl implements TaskServiceCrud {

  private final TaskRepository taskRepository;

  @Autowired
  public TaskServiceCrudImpl(TaskRepository taskRepository) {
    this.taskRepository = taskRepository;
  }

  @Override
  public Task getById(Long id) {
    return taskRepository.findById(id).orElseThrow(EntityNotFoundException::new);
  }

  @Override
  public List<Task> getAll() {
    return taskRepository.findAll();
  }

  @Override
  public Task save(Task task) {
    return taskRepository.save(task);
  }

  @Override
  public void deleteById(Long id) {
    taskRepository.deleteById(id);
  }
}
