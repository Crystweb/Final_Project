package ua.danit.final_project.dto;

import lombok.Data;

import java.io.Serializable;
import java.util.List;

@Data
public class UserDto implements Serializable {

  private Long id; // NOSONAR
  private String login; // NOSONAR
  private EmployeeDto employee; // NOSONAR
  private List<RoleDto> roles; // NOSONAR
}
