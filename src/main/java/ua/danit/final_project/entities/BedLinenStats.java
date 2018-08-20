package ua.danit.final_project.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
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
import java.io.Serializable;
import java.sql.Timestamp;


@Entity
@Table(name = "bed_linen_stats")
@Data
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class BedLinenStats implements Serializable {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne
  @ToString.Exclude
  @EqualsAndHashCode.Exclude
  @JoinColumn(name = "u_id", nullable = false)
  private User user;

  @ManyToOne
  @ToString.Exclude
  @EqualsAndHashCode.Exclude
  @JoinColumn(name = "b_id", nullable = false)
  private BedLinenType bedLinenType;

  @Column(name = "b_amount")
  private Integer amount;

  @Column(name = "c_date", nullable = false)
  private Timestamp date;
}
