package ua.danit.final_project.entities;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.GenerationType;
import javax.persistence.GeneratedValue;
import java.io.Serializable;
import java.sql.Timestamp;

@Entity
@Table(name = "vacancy")
@Data
public class Vacancy implements Serializable {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(name = "v_position", nullable = false)
  private String position;

  @Column(name = "v_salary", nullable = false)
  private Integer salary;

  @JsonFormat(pattern = "dd-MM-yyyy hh:mm")
  @Column(name = "v_publication", nullable = false)
  private Timestamp publication;


}
