package ua.danit.final_project.entities;

import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "user")
@Data
public class User implements Serializable {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne(fetch = FetchType.LAZY, optional = false)
  @JoinColumn(name = "r_id", nullable = false)
  private Role role;

  @Column(name = "u_login",unique = true, nullable = false)
  private String login;

  @Column(name = "u_password", nullable = false)
  private String password;
}
