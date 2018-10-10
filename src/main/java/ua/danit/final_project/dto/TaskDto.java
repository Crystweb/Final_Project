package ua.danit.final_project.dto;

import lombok.Data;
import ua.danit.final_project.entities.Task;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

@Data
public class TaskDto implements Serializable {

  private Long id; // NOSONAR
  private EmployeeDto assignee; // NOSONAR
  private EmployeeDto delegator; // NOSONAR
  private String message; // NOSONAR
  private Task.TaskStatus status; // NOSONAR
  private Task.TaskFrequency frequency; // NOSONAR
  private Date expired; // NOSONAR
  private Date updated; // NOSONAR
  private Integer priority; // NOSONAR
  private List<LocationDto> locations; // NOSONAR
  private List<String> imageLinks; // NOSONAR
  private List<TaskCommentDto> comments; // NOSONAR
}
