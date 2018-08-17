package ua.danit.final_project.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;
import java.io.Serializable;
import java.util.List;

@Entity
@Table(name = "user")
@Data
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class User implements Serializable {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(name = "u_login", unique = true, nullable = false)
  private String login;

  @JsonIgnore
  @Column(name = "u_password", nullable = false)
  private String password;

  @ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
  @JoinTable(name = "user_role",
          joinColumns = {@JoinColumn(name = "u_id")},
          inverseJoinColumns = {@JoinColumn(name = "r_id")})
  public List<Role> roles;
}