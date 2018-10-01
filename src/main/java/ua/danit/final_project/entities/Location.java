package ua.danit.final_project.entities;

import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "location")
@Data
public class Location implements Serializable {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(name = "l_title", nullable = false)
  private String title;

  @Column(name = "l_info")
  private String info;

  @ManyToOne
  @JoinColumn(name = "parent_location")
  private Location parentLocation;
}
