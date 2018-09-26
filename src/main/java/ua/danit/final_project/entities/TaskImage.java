package ua.danit.final_project.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import java.io.Serializable;

@Data
@Entity
@Table(name = "task_img")
public class TaskImage extends AbstractEntity implements Serializable {

  @JsonIgnore
  @ToString.Exclude
  @EqualsAndHashCode.Exclude
  @ManyToOne
  @JoinColumn(name = "task_id")
  private Task task;

  @Column(name = "url", nullable = false, unique = true)
  private String url;

  @Column(name = "aws_key")
  private String awsKey;
}
