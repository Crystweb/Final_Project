package ua.danit.final_project.entities;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.GeneratedValue;
import javax.persistence.ManyToOne;
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
  @JoinColumn(name = "user_id")
  @JsonIgnore
  private User user;

  @ManyToOne
  @JoinColumn(name = "position_id")
  @JsonIgnore
  private Position position;

  @Column(name = "forename", nullable = false)
  private String forename;

  @Column(name = "surname", nullable = false)
  private String surname;

  @Column(name = "patronymic")
  private String patronymic;

  @Column(name = "phone_number")
  private String phoneNumber;

  @Column(name = "info")
  private String info;
}
