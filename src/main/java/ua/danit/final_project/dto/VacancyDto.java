package ua.danit.final_project.dto;

import lombok.Data;
import ua.danit.final_project.entities.Vacancy;

import java.io.Serializable;
import java.sql.Timestamp;


@Data
public class VacancyDto implements Serializable {

  private Long id; // NOSONAR

  private EmployeeDto employee; // NOSONAR

  private PositionDto position; // NOSONAR

  private String salary; // NOSONAR

  private Vacancy.VacancyStatus status; // NOSONAR

  private String info; // NOSONAR

  private Timestamp publication; // NOSONAR
}
