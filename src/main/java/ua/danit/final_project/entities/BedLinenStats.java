package ua.danit.final_project.entities;

import com.sun.org.glassfish.external.statistics.TimeStatistic;
import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;


@Entity
@Table(name = "bed_linen_stats")
@Data
public class BedLinenStats implements Serializable {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne
  @JoinColumn(name = "u_id", nullable = false)
  private User user;

  @ManyToOne
  @JoinColumn(name = "b_id", nullable = false)
  private BedLinenType bedLinenType;

  @Column(name = "b_amount")
  private Integer amount;

  @Column(name = "c_date")
  private TimeStatistic date;
}
