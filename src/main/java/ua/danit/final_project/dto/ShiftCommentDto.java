package ua.danit.final_project.dto;

import lombok.Data;
import ua.danit.final_project.entities.Employee;
import ua.danit.final_project.entities.Position;
import ua.danit.final_project.entities.ShiftComment;

import java.io.Serializable;
import java.sql.Timestamp;
import java.util.List;
import java.util.stream.Collectors;

@Data
public class ShiftCommentDto implements Serializable {

  private Long id;

  private String text;

  private Timestamp date;

  private String forename;

  private String surname;

  private List<String> positions;

  private String authorPosition;

  public ShiftCommentDto(ShiftComment shiftComment) {
    this.id = shiftComment.getId();
    this.text = shiftComment.getMessage();
    this.date = shiftComment.getDate();

    Employee employee = shiftComment.getUser().getEmployee();
    this.forename = employee != null ? employee.getForename() : null;
    this.surname = employee != null ? employee.getSurname() : null;
    this.positions = shiftComment.getPositions()
            .stream()
            .map(Position::getTitle)
            .collect(Collectors.toList());
    this.authorPosition = shiftComment.getUser().getPosition().getTitle();
  }
}
