package ua.danit.final_project.entities;

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

  @ToString.Exclude
  @EqualsAndHashCode.Exclude
  @Column(name = "start", nullable = false)
  private Time start;

  @ToString.Exclude
  @EqualsAndHashCode.Exclude
  @Column(name = "end", nullable = false)
  private Time end;

  @Column(name = "date", nullable = false)
  private Timestamp date;

  @ManyToOne
  @JoinColumn(name = "position_id")
  private Position position;

}
