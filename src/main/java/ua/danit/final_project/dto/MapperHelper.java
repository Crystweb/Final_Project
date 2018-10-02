package ua.danit.final_project.dto;

import org.mapstruct.AfterMapping;
import org.mapstruct.MappingTarget;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import ua.danit.final_project.entities.Employee;
import ua.danit.final_project.entities.Task;
import ua.danit.final_project.entities.TaskComment;
import ua.danit.final_project.entities.TaskImage;
import ua.danit.final_project.entities.User;
import ua.danit.final_project.repositories.TaskRepository;
import ua.danit.final_project.repositories.UserRepository;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class MapperHelper {

  private final UserRepository userRepository;
  private final TaskRepository taskRepository;

  @Autowired
  public MapperHelper(UserRepository userRepository,
                      TaskRepository taskRepository) {
    this.userRepository = userRepository;
    this.taskRepository = taskRepository;
  }

  @AfterMapping
  public void mapUserId(Employee employee, @MappingTarget EmployeeDto employeeDto) {
    final Long userId = employee.hasUser()
        ? employee.getUser().getId()
        : null;

    employeeDto.setUserId(userId);
  }

  @AfterMapping
  public void addUserToEmployee(EmployeeDto employeeDto, @MappingTarget Employee employee) {
    if (employeeDto.getUserId() != null) {
      User user = userRepository.findById(employeeDto.getUserId()).orElse(null);
      employee.setUser(user);
    }
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
    taskDto.setImageLinks(images
        .stream()
        .map(TaskImage::getUrl)
        .collect(Collectors.toList())
    );
  }
}