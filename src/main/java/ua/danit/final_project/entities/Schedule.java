package ua.danit.final_project.entities;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import java.io.Serializable;
import java.sql.Time;

@Entity
@Table(name = "schedule")
@Data
public class Schedule implements Serializable {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne(fetch = FetchType.LAZY, optional = false)
  @ToString.Exclude
  @EqualsAndHashCode.Exclude
  @JoinColumn(name = "p_id", nullable = false)
  private Position position;

  @ToString.Exclude
  @EqualsAndHashCode.Exclude
  @Column(name = "start", nullable = false)
  private Time start;

  @ToString.Exclude
  @EqualsAndHashCode.Exclude
  @Column(name = "end", nullable = false)
  private Time end;
}
