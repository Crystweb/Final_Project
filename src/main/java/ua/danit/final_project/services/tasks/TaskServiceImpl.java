package ua.danit.final_project.services.tasks;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import ua.danit.final_project.entities.Location;
import ua.danit.final_project.entities.Task;
import ua.danit.final_project.repositories.TaskRepository;
import ua.danit.final_project.services.storage.StorageService;

import javax.persistence.EntityNotFoundException;
import java.io.IOException;
import java.util.Arrays;
import java.util.Date;
import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class TaskServiceImpl implements TaskService {

  private final TaskRepository taskRepository;
  private final StorageService storageService;

  @Autowired
  public TaskServiceImpl(TaskRepository taskRepository,
                         StorageService storageService) {
    this.taskRepository = taskRepository;
    this.storageService = storageService;
  }

  @Override
  public Task create(Task task, MultipartFile file) throws IOException {
    if (task.getStatus() == null) {
      task.setStatus(Task.TaskStatus.OPENED);
    }
    task = taskRepository.save(task);

    if (file != null) {
      storageService.storeFile(file, task);
    }

    return task;
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
