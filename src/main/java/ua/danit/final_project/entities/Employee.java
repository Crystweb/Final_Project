package ua.danit.final_project.entities;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "employee")
@Data
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Employee implements Serializable {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @OneToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "u_id", nullable = false, unique = true)
  private User user;

  @Column(name = "e_forename", nullable = false)
  private String forename;

  @Column(name = "e_surname", nullable = false)
  private String surname;

  @Column(name = "e_patronymic", nullable = false)
  private String patronymic;
}
