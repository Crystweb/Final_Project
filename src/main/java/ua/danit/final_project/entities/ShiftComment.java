package ua.danit.final_project.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import java.io.Serializable;
import java.sql.Timestamp;
import java.util.List;

@Entity
@Table(name = "shift_comment")
@Data
public class ShiftComment implements Serializable {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne
  @ToString.Exclude
  @EqualsAndHashCode.Exclude
  @JoinColumn(name = "u_id", nullable = false)
  @JsonIgnoreProperties("roles")
  private User user;

  @ManyToMany(cascade = CascadeType.PERSIST, fetch = FetchType.LAZY)
  @ToString.Exclude
  @EqualsAndHashCode.Exclude
  @JoinTable(
          name = "shift_comment_position",
          joinColumns = {@JoinColumn(name = "comment_id")},
          inverseJoinColumns = {@JoinColumn(name = "position_id")})
  private List<Position> positions;

  @Column(name = "c_message", nullable = false)
  private String message;

  @Column(name = "c_date", nullable = false)
  private Timestamp date;
}
