package ua.danit.final_project.dto;

import lombok.Data;

import java.io.Serializable;

@Data
public class RoleDto implements Serializable {

  private Long id; // NOSONAR
  private String name; // NOSONAR
}
