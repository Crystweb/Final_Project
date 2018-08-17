package ua.danit.final_project.entities;

import lombok.Data;

import javax.persistence.Embeddable;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import java.io.Serializable;

@Entity
@Table(name = "task_location")
@Data
public class TaskLocation implements Serializable {

  @EmbeddedId
  private TaskLocationId taskLocationId;


}

@Embeddable
class TaskLocationId implements Serializable {

  @ManyToOne
  @JoinColumn(name = "t_id", nullable = false)
  private Long taskId;

  @ManyToOne
  @JoinColumn(name = "l_id", nullable = false)
  private Long locationId;
}
