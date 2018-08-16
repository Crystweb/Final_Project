package ua.danit.final_project.entities;

import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "consumer")
@Data
public class Consumer implements Serializable {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(name  = "c_name", nullable = false, unique = true)
  private String name;

  @Column(name = "c_description")
  private String description;
}
