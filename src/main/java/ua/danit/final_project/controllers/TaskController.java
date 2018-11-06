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
import ua.danit.final_project.dto.TaskDto;
import ua.danit.final_project.entities.Location;
import ua.danit.final_project.entities.Task;
import ua.danit.final_project.services.tasks.TaskService;
import ua.danit.final_project.services.websocket.WebSocketService;

import java.io.IOException;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/task")
public class TaskController {

  private final TaskService taskService;
  private final ObjectMapper objectMapper;
  private final WebSocketService webSocketService;

  @Autowired
  public TaskController(TaskService taskService,
                        ObjectMapper objectMapper,
                        WebSocketService webSocketService) {
    this.taskService = taskService;
    this.objectMapper = objectMapper;
    this.webSocketService = webSocketService;
  }

  @GetMapping("/status")
  public List<Task.TaskStatus> getStatuses() {
    return taskService.getStatuses();
  }

  @GetMapping("/frequency")
  public List<Task.TaskFrequency> getFrequencies() {
    return taskService.getFrequencies();
  }

  @GetMapping("/date")
  public List<TaskDto> findByDateBetween(@RequestParam("from") Long from,
                                         @RequestParam("to") Long to) {
    Date dateFrom = new Date(from);
    Date dateTo = new Date(to);
    return taskService.findAllByDateBetween(dateFrom, dateTo);
  }

  @GetMapping
  public List<TaskDto> getActiveTasks(@RequestParam(value = "location", required = false) Location location) {
    List<TaskDto> tasks;
    if (location == null) {
      tasks = taskService.findAllActive();
    } else {
      tasks = taskService.findAllByLocation(location);
    }
    return tasks;
  }

  @PostMapping
  public TaskDto create(@RequestPart(name = "file", required = false) MultipartFile file,
                     @RequestParam(name = "task") String taskString) throws IOException {
    TaskDto taskDto = objectMapper.readValue(taskString, TaskDto.class);
    taskDto = taskService.create(taskDto, file);
    webSocketService.updateTask(objectMapper.writeValueAsString(taskDto));
    return taskDto;
  }

  @PutMapping
  public TaskDto update(@RequestBody TaskDto taskDto) {
    return taskService.update(taskDto);
  }

  @DeleteMapping
  public TaskDto remove(@RequestParam("id") Long taskId) {
    return taskService.remove(taskId);
  }
}
