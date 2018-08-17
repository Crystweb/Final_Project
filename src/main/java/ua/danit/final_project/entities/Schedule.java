package ua.danit.final_project.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

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
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Schedule implements Serializable {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne(fetch = FetchType.LAZY, optional = false)
  @JoinColumn(name = "p_id", nullable = false)
  private Position position;

  @Column(name = "start", nullable = false)
  private Time start;

  @Column(name = "end", nullable = false)
  private Time end;
}