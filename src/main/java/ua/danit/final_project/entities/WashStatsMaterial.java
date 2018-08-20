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


@Entity
@Table(name = "wash_stats_materials")
@Data
public class WashStatsMaterial implements Serializable {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne
  @JoinColumn(name = "w_s_id", nullable = false)
  private WashStats washStats;

  @ManyToOne
  @JoinColumn(name = "m_id", nullable = false)
  private CleaningMaterial cleaningMaterial;

  @Column(name = "m_amount")
  private Integer amount;
}
