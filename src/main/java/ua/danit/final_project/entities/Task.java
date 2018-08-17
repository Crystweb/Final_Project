package ua.danit.final_project.entities;

import lombok.Data;

import javax.persistence.CascadeType;
import javax.persistence.FetchType;
import javax.persistence.Id;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import java.io.Serializable;
import java.sql.Timestamp;
import java.util.List;

@Entity
@Table(name = "task")
@Data
public class Task implements Serializable {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne //Чи можна делегувати задачу декільком працівникам?
  @JoinColumn(name = "u_id_assignee")
  private User assignee;

  @ManyToOne
  @JoinColumn(name = "u_id_delegator", nullable = false)
  private User delegator;

  @Column(name = "t_message")
  private String message;

  @Column(name = "t_status")
  private String status;

  @Column(name = "t_frequency")
  private String frequency;

  @Column(name = "updated", nullable = false)
  private Timestamp updated;

  @ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
  @JoinTable(
          name = "task_location",
          joinColumns = {@JoinColumn(name = "t_id")},
          inverseJoinColumns = {@JoinColumn(name = "l_id")})
  List<Location> locations;
}
