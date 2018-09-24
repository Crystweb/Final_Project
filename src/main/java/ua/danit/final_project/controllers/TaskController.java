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
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import ua.danit.final_project.entities.Location;
import ua.danit.final_project.entities.Task;
import ua.danit.final_project.services.tasks.TaskService;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/task")
public class TaskController {

  private final TaskService taskService;

  @Autowired
  public TaskController(TaskService taskService) {
    this.taskService = taskService;
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
  public List<Task> getActiveTasks(@RequestParam(value = "location", required = false) Location location) {
    if (location == null) {
      return taskService.findAllActive();
    } else {
      return taskService.findAllByLocation(location);
    }
  }

  @PostMapping
  public Task create(@RequestParam("task") String taskJson,
                     @RequestParam(value = "file", required = false) MultipartFile file) throws IOException {

    ObjectMapper mapper = new ObjectMapper();
    Task task = mapper.readValue(taskJson, Task.class);

    return taskService.create(task, file);
  }

  @PutMapping
  public Task update(@RequestBody Task task) {
    return taskService.update(task);
  }

  @DeleteMapping
  public Task remove(@RequestParam("id") Long taskId) {
    return taskService.remove(taskId);
  }
}
