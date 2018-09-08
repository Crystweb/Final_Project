package ua.danit.final_project.entities;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import java.io.Serializable;
import java.sql.Timestamp;

@Entity
@Table(name = "vacancy")
@Data
public class Vacancy implements Serializable {

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
  @JoinColumn(name = "p_id", nullable = false)
  private Position position;

  @Column(name = "v_salary")
  private String salary;

  @Enumerated(EnumType.STRING)
  @Column(name = "v_status", nullable = false)
  private VacancyStatus vacancyStatus;

  @Column(name = "v_info", nullable = false)
  private String info;

  @JsonFormat(pattern = "dd-MM-yyyy hh:mm")
  @Column(name = "p_publication", nullable = false)
  private Timestamp publication;

  public enum VacancyStatus {
    OPENED, CLOSED
  }
}


