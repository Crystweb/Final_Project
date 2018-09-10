package ua.danit.final_project.entities;

import lombok.Data;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.MappedSuperclass;
import java.util.Date;

@MappedSuperclass
@Data
abstract class AbstractEntity {

  // Primary key for entity
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private long id;

  // Jpa audit time
  @Column(name = "created_at")
  @CreatedDate
  private Date createdDate;

  @Column(name = "last_update")
  @LastModifiedDate
  private Date updatedDate;
}
