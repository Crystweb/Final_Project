package ua.danit.final_project.entities;

import lombok.Data;
import org.springframework.data.annotation.Id;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "mealtime_category")
@Data
public class MealTimeCategory implements Serializable {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(name = "m_title", nullable = false, unique = true)
  private String title;
}
