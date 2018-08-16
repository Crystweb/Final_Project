package ua.danit.final_project.entities;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import javax.persistence.*;
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
  @JoinColumn(name = "u_id")
  private User user;

  @ManyToOne
  @JoinColumn(name = "p_id")
  private Position position;

  @Column(name = "v_status", nullable = false)
  private String status;

  @Column(name = "v_salary")
  private Integer salary;

  @Column(name = "v_info")
  private String info;

  @JsonFormat(pattern = "dd-MM-yyyy hh:mm")
  @Column(name = "v_publication", nullable = false)
  private Timestamp publication;
}
