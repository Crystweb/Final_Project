package ua.danit.final_project.services.tasks;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ua.danit.final_project.entities.Location;
import ua.danit.final_project.entities.Task;
import ua.danit.final_project.repositories.TaskRepository;

import javax.persistence.EntityNotFoundException;
import java.util.Arrays;
import java.util.Date;
import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class TaskServiceImpl implements TaskService {

  private final TaskRepository taskRepository;

  @Autowired
  public TaskServiceImpl(TaskRepository taskRepository) {
    this.taskRepository = taskRepository;
  }

  @Override
  public Task create(Task task) {
    if (task.getStatus() == null) {
      task.setStatus(Task.TaskStatus.OPENED);
    }
    return taskRepository.save(task);
  }

  @Override
  public Task update(Task task) {
    return taskRepository.save(task);
  }

  @Override
  public Task remove(Long taskId) {
    Task task = taskRepository.findById(taskId).orElseThrow(EntityNotFoundException::new);
    task.setStatus(Task.TaskStatus.REMOVED);
    return taskRepository.save(task);
  }

  @Override
  public List<Task> findAllActive() {
    List<Task.TaskStatus> statuses = new LinkedList<>();
    statuses.add(Task.TaskStatus.CLOSED);
    statuses.add(Task.TaskStatus.REMOVED);
    statuses.add(Task.TaskStatus.REJECTED);
    return taskRepository.findAllByStatusNotIn(statuses)
        .stream()
        .filter(t -> t.getExpired() == null || t.getExpired().after(new Date()))
        .collect(Collectors.toList());
  }

  @Override
  public List<Task> findAllByLocation(Location location) {

    return taskRepository.findAllByLocationsContains(location)
        .stream()
        .filter(t -> t.getExpired() == null || t.getExpired().after(new Date()))
        .collect(Collectors.toList());
  }

  @Override
  public List<Task.TaskStatus> getStatuses() {
    return Arrays.asList(Task.TaskStatus.values());
  }

  @Override
  public List<Task.TaskFrequency> getFrequencies() {
    return Arrays.asList(Task.TaskFrequency.values());
  }
}
