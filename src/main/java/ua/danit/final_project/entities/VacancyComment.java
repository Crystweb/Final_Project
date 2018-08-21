package ua.danit.final_project.entities;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
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
  @ToString.Exclude
  @EqualsAndHashCode.Exclude
  @JoinColumn(name = "u_id", nullable = false)
  private User user;

  @ManyToOne
  @ToString.Exclude
  @EqualsAndHashCode.Exclude
  @JoinColumn(name = "v_id", nullable = false)
  private Vacancy vacancy;

  @Column(name = "c_message", nullable = false)
  private String message;

  @Column(name = "c_date", nullable = false)
  private Timestamp date;
}
