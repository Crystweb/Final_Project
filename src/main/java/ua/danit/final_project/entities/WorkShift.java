package ua.danit.final_project.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
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
import javax.persistence.OneToMany;
import javax.persistence.Table;
import java.sql.Time;
import java.sql.Timestamp;
import java.util.List;

@Entity
@Table(name = "work_shift")
@Data
public class WorkShift {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne
  @ToString.Exclude
  @EqualsAndHashCode.Exclude
  @JsonIgnore
  @JoinColumn(name = "u_id")
  private User user;

  @ToString.Exclude
  @EqualsAndHashCode.Exclude
  @Column(name = "start", nullable = false)
  private Time start;

  @ToString.Exclude
  @EqualsAndHashCode.Exclude
  @Column(name = "end", nullable = false)
  private Time end;

  @Column(name = "date", nullable = false)
  private Timestamp date;

  @ToString.Exclude
  @EqualsAndHashCode.Exclude
  @JsonIgnoreProperties("workShift")
  @OneToMany(mappedBy = "workShift", fetch = FetchType.EAGER)
  private List<ShiftComment> shiftComments;
}
