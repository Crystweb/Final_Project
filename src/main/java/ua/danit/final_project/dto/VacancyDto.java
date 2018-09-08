package ua.danit.final_project.dto;

import lombok.Data;
import ua.danit.final_project.entities.Vacancy;

import java.io.Serializable;
import java.sql.Timestamp;


@Data
public class VacancyDto implements Serializable {

  private Long id;

  private String position;

  private String salary;

  private String status;

  private String info;

  private Timestamp publication;

  public VacancyDto(Vacancy vacancy) {
    this.id = vacancy.getId();
    this.position = vacancy.getPosition().getTitle();
    this.salary = vacancy.getSalary();
    this.status = vacancy.getStatus();
    this.info = vacancy.getInfo();
    this.publication = vacancy.getPublication();

/*    this.date = vacancy.getDate();

    Employee employee = shiftComment.getUser().getEmployee();
    this.forename = employee != null ? employee.getForename() : null;
    this.surname = employee != null ? employee.getSurname() : null;
    this.positions = shiftComment.getPositions()
            .stream()
            .map(Position::getTitle)
            .collect(Collectors.toList());
    this.authorPosition = shiftComment.getUser().getPosition().getTitle();*/
  }
}
