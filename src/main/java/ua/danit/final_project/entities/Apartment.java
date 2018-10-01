package ua.danit.final_project.entities;

import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.Column;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import java.io.Serializable;

@Data
@EqualsAndHashCode(callSuper = true)
public class Apartment extends AbstractEntity implements Serializable {

  @Column(name = "title")
  private String title;

  @ManyToOne
  @JoinColumn(name = "location_id")
  private Location location;
}
