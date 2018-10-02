package ua.danit.final_project.dto;

import lombok.Data;

import java.io.Serializable;
import java.util.List;

@Data
public class LocationDto implements Serializable {

  private Long id; // NOSONAR
  private String title; // NOSONAR
  private String info; // NOSONAR
  private List<LocationDto> children; // NOSONAR
}
