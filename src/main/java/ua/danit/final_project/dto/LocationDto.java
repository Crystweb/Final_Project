package ua.danit.final_project.dto;

import lombok.Data;

import java.io.Serializable;
@Data
public class LocationDto implements Serializable {

  private Long id;
  private String title;
  private String info;
  private Long parentId;
}
