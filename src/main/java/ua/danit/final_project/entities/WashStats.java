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
import java.io.Serializable;
import java.sql.Timestamp;

@Entity
@Table(name = "wash_stats_materials")
@Data
public class WashStats implements Serializable {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne
  @JoinColumn(name = "u_id", nullable = false)
  private User user;

  @ManyToOne
  @JoinColumn(name = "w_p_id", nullable = false)
  private WashPeriod washPeriod;

  @ManyToOne
  @JoinColumn(name = "c_id")
  private Consumer consumer;

  @Column(name = "w_weight")
  private Integer weight;

  @Column(name = "date", nullable = false)
  private Timestamp date;
}
