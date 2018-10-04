package ua.danit.final_project.dto;

import lombok.Data;
import java.io.Serializable;

@Data
public class EmployeeDto implements Serializable {

  private Long id; // NOSONAR
  private Long userId; // NOSONAR
  private PositionDto position; // NOSONAR
  private String forename; // NOSONAR
  private String surname; // NOSONAR
  private String patronymic; // NOSONAR
  private String phoneNumber; // NOSONAR
  private String info; // NOSONAR

}
