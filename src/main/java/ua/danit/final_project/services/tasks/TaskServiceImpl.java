package ua.danit.final_project.services.tasks;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import ua.danit.final_project.configuration.SessionAware;
import ua.danit.final_project.dto.DefaultMapper;
import ua.danit.final_project.dto.TaskDto;
import ua.danit.final_project.entities.Location;
import ua.danit.final_project.entities.Task;
import ua.danit.final_project.entities.TaskImage;
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
public class TaskServiceImpl extends SessionAware implements TaskService {

  private final TaskRepository taskRepository;
  private final StorageService storageService;
  private final DefaultMapper mapper;

  @Autowired
  public TaskServiceImpl(TaskRepository taskRepository,
                         StorageService storageService,
                         DefaultMapper mapper) {
    this.taskRepository = taskRepository;
    this.storageService = storageService;
    this.mapper = mapper;
  }

  @Override
  public TaskDto create(TaskDto taskDto, MultipartFile file) throws IOException {
    Task task = mapper.taskDtoToTask(taskDto);
    task.setDelegator(getEmployee());

    if (task.getStatus() == null) {
      task.setStatus(Task.TaskStatus.OPENED);
    }
    task = taskRepository.save(task);

    if (file != null) {
      TaskImage img = storageService.storeTaskImage(file, task);
      task.getImages().add(img);
    }

    return mapper.taskToTaskDto(task);
  }

  @Override
  public TaskDto update(TaskDto taskDto) {
    Task task = mapper.taskDtoToTask(taskDto);
    task = taskRepository.save(task);
    return mapper.taskToTaskDto(task);
  }

  @Override
  public TaskDto remove(Long taskId) {
    Task task = taskRepository.findById(taskId).orElseThrow(EntityNotFoundException::new);
    task.setStatus(Task.TaskStatus.REMOVED);
    task = taskRepository.save(task);
    return mapper.taskToTaskDto(task);
  }

  @Override
  public List<TaskDto> findAllActive() {
    List<Task.TaskStatus> statuses = new LinkedList<>();
    statuses.add(Task.TaskStatus.CLOSED);
    statuses.add(Task.TaskStatus.REMOVED);
    statuses.add(Task.TaskStatus.REJECTED);
    return taskRepository.findAllByStatusNotIn(statuses)
        .stream()
        .filter(t -> t.getExpired() == null || t.getExpired().after(new Date()))
        .map(mapper::taskToTaskDto)
        .collect(Collectors.toList());
  }

  @Override
  public List<TaskDto> findAllByLocation(Location location) {

    return taskRepository.findAllByLocationsContains(location)
        .stream()
        .filter(t -> t.getExpired() == null || t.getExpired().after(new Date()))
        .map(mapper::taskToTaskDto)
        .collect(Collectors.toList());
  }

  @Override
  public List<TaskDto> findAllByDateBetween(Date from, Date to) {
    return taskRepository.findAllByUpdatedIsBetween(from, to)
        .stream()
        .filter(t -> Task.TaskStatus.CLOSED.equals(t.getStatus()))
        .map(mapper::taskToTaskDto)
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
