package ua.danit.final_project.entities;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Table(name = "vacancy_comment")
@Data
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class VacancyComment {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne
  @JoinColumn(name = "u_id", nullable = false)
  private User user;

  @ManyToOne
  @JoinColumn(name = "v_id")
  private Vacancy vacancy;

  @Column(name = "c_message", nullable = false)
  private String message;

  @Column(name = "c_date", nullable = false)
  private Timestamp date;
}
