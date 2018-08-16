package ua.danit.final_project.entities;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import java.sql.Time;
import java.sql.Timestamp;

@Entity
@Table(name = "work_shift")
@Data
public class WorkShift {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne
  @JoinColumn(name = "u_id", nullable = false)
  private User user;

  @Column(name = "start", nullable = false)
  private Time start;

  @Column(name = "end", nullable = false)
  private Time end;

  @Column(name = "date", nullable = false)
  private Timestamp date;
}
