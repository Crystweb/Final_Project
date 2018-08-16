package ua.danit.final_project.entities;

import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "cleaning_material")
@Data
public class CleaningMaterial implements Serializable {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(name = "c_g_title", nullable = false, unique = true)
  private String title;
}
