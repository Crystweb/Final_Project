package ua.danit.final_project.dto;

import lombok.Data;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

@Data
public class ShiftCommentDto implements Serializable {

  private Long id; // NOSONAR
  private EmployeeDto author; // NOSONAR
  private String message; // NOSONAR
  private List<PositionDto> positions; // NOSONAR
  private Date date; // NOSONAR
}
