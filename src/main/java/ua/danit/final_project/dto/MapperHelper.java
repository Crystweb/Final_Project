package ua.danit.final_project.dto;

import org.mapstruct.AfterMapping;
import org.mapstruct.MappingTarget;
import org.springframework.stereotype.Component;
import ua.danit.final_project.entities.Employee;
import ua.danit.final_project.entities.Task;
import ua.danit.final_project.entities.TaskImage;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class MapperHelper {

  @AfterMapping
  public void mapUserId(Employee employee, @MappingTarget EmployeeDto employeeDto) {
    final Long userId = employee.hasUser()
        ? employee.getUser().getId()
        : null;

    employeeDto.setUserId(userId);
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