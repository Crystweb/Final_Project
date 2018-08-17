package ua.danit.final_project.entities;

import lombok.Data;
import org.springframework.data.annotation.Id;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import java.io.Serializable;
import java.sql.Timestamp;

@Entity
@Table(name = "food_supply")
@Data
public class FoodSupply implements Serializable {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne
  @JoinColumn(name = "m_id")
  private MealTimeCategory mealTimeCategory;

  @ManyToOne
  @JoinColumn(name = "u_id")
  private User user;

  @ManyToOne
  @JoinColumn(name = "c_id")
  private Consumer consumer;

  @ManyToOne
  @JoinColumn(name = "l_id")
  private Location location;

  @Column(name = "f_amount", nullable = false)
  private Integer amount;

  @Column(name = "f_date", nullable = false)
  private Timestamp date;
}

