package ua.danit.final_project.entities;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.MappedSuperclass;

@MappedSuperclass
@Data
public abstract class AbstractImage extends AbstractEntity {


  @Column(name = "url", nullable = false, unique = true)
  private String url;

  @Column(name = "aws_key")
  private String awsKey;
}
