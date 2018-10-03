package ua.danit.final_project.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import ua.danit.final_project.dto.DefaultMapper;
import ua.danit.final_project.dto.TaskDto;
import ua.danit.final_project.entities.Location;
import ua.danit.final_project.entities.Task;
import ua.danit.final_project.services.tasks.TaskService;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/task")
public class TaskController {

  private final TaskService taskService;
  private final ObjectMapper objectMapper;
  private final DefaultMapper mapper;

  @Autowired
  public TaskController(TaskService taskService,
                        ObjectMapper objectMapper,
                        DefaultMapper mapper) {
    this.taskService = taskService;
    this.objectMapper = objectMapper;
    this.mapper = mapper;
  }

  @GetMapping("/status")
  public List<Task.TaskStatus> getStatuses() {
    return taskService.getStatuses();
  }

  @GetMapping("/frequency")
  public List<Task.TaskFrequency> getFrequencies() {
    return taskService.getFrequencies();
  }

  @GetMapping
  public List<TaskDto> getActiveTasks(@RequestParam(value = "location", required = false) Location location) {
    List<Task> tasks;
    if (location == null) {
      tasks = taskService.findAllActive();
    } else {
      tasks = taskService.findAllByLocation(location);
    }
    return tasks.stream()
        .map(mapper::taskToTaskDto)
        .collect(Collectors.toList());
  }

  @PostMapping
  public TaskDto create(@RequestPart(name = "file", required = false) MultipartFile file,
                     @RequestParam(name = "task") String taskString) throws IOException {
    TaskDto taskDto = objectMapper.readValue(taskString, TaskDto.class);
    Task task = mapper.taskDtoToTask(taskDto);
    task = taskService.create(task, file);
    return mapper.taskToTaskDto(task);
  }

  @PutMapping
  public TaskDto update(@RequestBody TaskDto taskDto) {
    Task task = mapper.taskDtoToTask(taskDto);
    task = taskService.update(task);
    return mapper.taskToTaskDto(task);
  }

  @DeleteMapping
  public TaskDto remove(@RequestParam("id") Long taskId) {
    Task task = taskService.remove(taskId);
    return mapper.taskToTaskDto(task);
  }
}
