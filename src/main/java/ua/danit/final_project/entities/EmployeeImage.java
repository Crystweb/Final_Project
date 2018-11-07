package ua.danit.final_project.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import java.io.Serializable;

@Data
@Entity
@Table(name = "employee_img")
public class EmployeeImage extends AbstractImage implements Serializable {

  @JsonIgnore
  @ToString.Exclude
  @EqualsAndHashCode.Exclude
  @OneToOne
  @JoinColumn(name = "employee_id")
  private Employee employee;
}
