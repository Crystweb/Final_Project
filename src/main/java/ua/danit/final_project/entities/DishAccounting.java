package ua.danit.final_project.entities;

import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;
import java.sql.Timestamp;

@Entity
@Table(name = "dish_accounting")
@Data
public class DishAccounting implements Serializable {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne
  @JoinColumn(name = "d_id", nullable = false)
  private DishType dishType;

  @ManyToOne
  @JoinColumn(name = "l_id")
  private Location location;

  @ManyToOne
  @JoinColumn(name = "u_id", nullable = false)
  private User user;

  @Column(name = "d_amount", nullable = false)
  private Integer delta;

  @Column(name = "date", nullable = false)
  private Timestamp date;
}
