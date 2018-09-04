package ua.danit.final_project.dto;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.ToString;
import ua.danit.final_project.entities.Employee;
import ua.danit.final_project.entities.Position;
import ua.danit.final_project.entities.ShiftComment;

import java.io.Serializable;
import java.sql.Timestamp;
import java.util.List;
import java.util.stream.Collectors;

@Getter
@EqualsAndHashCode
@ToString
public class ShiftCommentDTO implements Serializable {

  private final Long id;

  private final String text;

  private final Timestamp date;

  private final String forename;

  private final String surname;

  private final List<String> positions;

  private final String authorPosition;

  public ShiftCommentDTO(ShiftComment shiftComment) {
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
