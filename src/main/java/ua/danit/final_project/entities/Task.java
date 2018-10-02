package ua.danit.final_project.entities;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "task")
@Data
@NoArgsConstructor
public class Task implements Serializable {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne
  @ToString.Exclude
  @EqualsAndHashCode.Exclude
  @JoinColumn(name = "e_id_assignee")
  private Employee assignee;

  @ManyToOne
  @ToString.Exclude
  @EqualsAndHashCode.Exclude
  @JoinColumn(name = "e_id_delegator", nullable = false)
  private Employee delegator;

  @Column(name = "t_message")
  private String message;

  @Enumerated(EnumType.STRING)
  @Column(name = "t_status")
  private TaskStatus status;

  @Enumerated(EnumType.STRING)
  @Column(name = "t_frequency")
  private TaskFrequency frequency;

  @Column(name = "expired")
  private Date expired;

  @Column(name = "updated")
  private Date updated;

  @Column
  private Integer priority;

  @ManyToMany(cascade = CascadeType.MERGE, fetch = FetchType.LAZY)
  @ToString.Exclude
  @EqualsAndHashCode.Exclude
  @JoinTable(
          name = "task_location",
          joinColumns = {@JoinColumn(name = "t_id")},
          inverseJoinColumns = {@JoinColumn(name = "l_id")})
  private List<Location> locations;

  @OneToMany(mappedBy = "task")
  private List<TaskImage> images;

  @EqualsAndHashCode.Exclude
  @ToString.Exclude
  @OneToMany(mappedBy = "task", fetch = FetchType.LAZY)
  private List<TaskComment> comments;

  public enum TaskStatus {
    REMOVED ,OPENED, CLOSED, REJECTED, PENDING, IN_PROGRESS, EXPIRED, CHANGE
  }

  public enum TaskFrequency {
    ONCE, DAILY, WEEKLY, MONTHLY
  }
}
