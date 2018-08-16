package ua.danit.final_project.entities;

import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;
import java.sql.Timestamp;

@Entity
@Table(name = "shift_comment")
@Data
public class ShiftComment implements Serializable {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne
  @JoinColumn(name = "u_id", nullable = false)
  private User user;

  @ManyToOne
  @JoinColumn(name = "w_shift_id", nullable = false)
  private WorkShift workShift;

  @Column(name = "c_message", nullable = false)
  private String message;

  @Column(name = "c_date", nullable = false)
  private Timestamp date;
}
