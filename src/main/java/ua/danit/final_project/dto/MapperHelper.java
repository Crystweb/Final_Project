package ua.danit.final_project.dto;

import org.mapstruct.AfterMapping;
import org.mapstruct.MappingTarget;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import ua.danit.final_project.entities.Employee;
import ua.danit.final_project.entities.EmployeeImage;
import ua.danit.final_project.entities.Task;
import ua.danit.final_project.entities.TaskComment;
import ua.danit.final_project.entities.TaskImage;
import ua.danit.final_project.repositories.TaskRepository;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class MapperHelper {

  private final TaskRepository taskRepository;

  @Autowired
  public MapperHelper(
      TaskRepository taskRepository) {
    this.taskRepository = taskRepository;
  }

  @AfterMapping
  public void mapTaskId(TaskComment taskComment, @MappingTarget TaskCommentDto taskCommentDto) {
    taskCommentDto.setTaskId(taskComment.getTask().getId());
  }

  @AfterMapping
  public void addTaskToTaskComment(TaskCommentDto taskDto, @MappingTarget TaskComment taskComment) {
    Task task = taskRepository
        .findById(taskDto.getTaskId())
        .orElseThrow(IllegalArgumentException::new);
    taskComment.setTask(task);
  }

  @AfterMapping
  public void mapImageLinks(Task task, @MappingTarget TaskDto taskDto) {
    List<TaskImage> images = task.getImages();
    if (images != null) {
      taskDto.setImageLinks(images
          .stream()
          .map(TaskImage::getUrl)
          .collect(Collectors.toList())
      );
    }
  }

  @AfterMapping
  public void mapImageLink(Employee employee, @MappingTarget EmployeeDto employeeDto) {
    EmployeeImage image = employee.getEmployeeImage();
    if (image != null) {
      employeeDto.setImage(image.getUrl());
    }
  }
}