package ua.danit.final_project.entities;

import lombok.Data;
import org.springframework.data.annotation.Id;

import javax.persistence.*;
import java.io.Serializable;
import java.sql.Timestamp;

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

  @ManyToOne
  @JoinColumn(name = "l_id", nullable = false)
  private Location location;

  @Column(name = "t_message")
  private String message;

  @Column(name = "t_status")
  private String status;

  @Column(name = "t_frequency")
  private String frequency;

  @Column(name = "updated", nullable = false)
  private Timestamp updated;
}
