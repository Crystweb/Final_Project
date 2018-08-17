package ua.danit.final_project.entities;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.GeneratedValue;
import javax.persistence.OneToOne;
import javax.persistence.GenerationType;
import javax.persistence.JoinColumn;
import javax.persistence.Table;
import javax.persistence.Column;
import java.io.Serializable;

@Entity
@Table(name = "employee")
@Data
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Employee implements Serializable {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @OneToOne
  @JoinColumn(name = "u_id")
  @JsonIgnore
  private User user;

  @OneToOne
  @JoinColumn(name = "p_id")
  @JsonIgnore
  private Position position;

  @Column(name = "e_forename", nullable = false)
  private String forename;

  @Column(name = "e_surname", nullable = false)
  private String surname;

  @Column(name = "e_patronymic")
  private String patronymic;

  @Column(name = "e_phone_number")
  private String phoneNumber;

  @Column(name = "e_info")
  private String info;
}