package ua.danit.final_project.dto;

import lombok.Data;

import java.io.Serializable;

@Data
public class PositionDto implements Serializable {

  private Long id; // NOSONAR
  private String title; // NOSONAR
}
