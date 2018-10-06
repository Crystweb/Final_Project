package ua.danit.final_project.dto;

import lombok.Data;

import java.io.Serializable;
import java.util.Date;

@Data
public class CheckInDto implements Serializable {

  private Long id; // NOSONAR
  private EmployeeDto employee; // NOSONAR
  private LocationDto location; // NOSONAR
  private Date created; // NOSONAR
}
