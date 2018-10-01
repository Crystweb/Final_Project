package ua.danit.final_project.entities;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
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
