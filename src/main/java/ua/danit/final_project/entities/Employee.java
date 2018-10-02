package ua.danit.final_project.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
import javax.persistence.OneToOne;
import javax.persistence.Table;
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
  @ToString.Exclude
  @EqualsAndHashCode.Exclude
  private User user;

  @ManyToOne
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

  public boolean hasUser() {
    return !(user == null);
  }
}
