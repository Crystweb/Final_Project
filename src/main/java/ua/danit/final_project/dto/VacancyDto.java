package ua.danit.final_project.dto;

import lombok.Data;
import ua.danit.final_project.entities.Vacancy;

import java.io.Serializable;
import java.sql.Timestamp;


@Data
public class VacancyDto implements Serializable {

  private Long id; // NOSONAR

  private Long authorId; // NOSONAR

  private Long positionId; // NOSONAR

  private String salary; // NOSONAR

  private Vacancy.VacancyStatus status; // NOSONAR

  private String info; // NOSONAR

  private Timestamp publication; // NOSONAR

  public VacancyDto(Vacancy vacancy) {
    this.id = vacancy.getId();
    this.authorId = vacancy.getUser().getId();
    this.positionId = vacancy.getPosition().getId();
    this.salary = vacancy.getSalary();
    this.status = vacancy.getVacancyStatus();
    this.info = vacancy.getInfo();
    this.publication = vacancy.getPublication();
  }
}
