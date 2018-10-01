package ua.danit.final_project.dto;

import lombok.Data;

import java.io.Serializable;
import java.util.List;

@Data
public class LocationDto implements Serializable {

  private Long id;
  private String title;
  private String info;
  private List<LocationDto> children;
}
