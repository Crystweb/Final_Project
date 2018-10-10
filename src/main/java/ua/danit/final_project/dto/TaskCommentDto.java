package ua.danit.final_project.dto;

import lombok.Data;

import java.io.Serializable;
import java.util.Date;

@Data
public class TaskCommentDto implements Serializable {

  private Long id; // NOSONAR
  private Long taskId; // NOSONAR
  private EmployeeDto author; // NOSONAR
  private String message; // NOSONAR
  private Date date; // NOSONAR
}
