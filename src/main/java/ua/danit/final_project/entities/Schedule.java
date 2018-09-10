package ua.danit.final_project.entities;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import java.io.Serializable;
import java.sql.Time;
import java.util.Date;

@Entity
@Table(name = "schedule")
@Data
public class Schedule extends AbstractEntity implements Serializable {

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

  @Column(name = "uuid")
  private String uuid;

  @Column(name = "expired")
  private Date expired;
}
