package ua.danit.final_project.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import ua.danit.final_project.configuration.StaticCollection;
import ua.danit.final_project.entities.Schedule;
import ua.danit.final_project.dto.ShiftCommentDto;
import ua.danit.final_project.entities.ShiftComment;
import ua.danit.final_project.entities.User;
import ua.danit.final_project.services.WorkCommentService;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/workshift")
public class WorkShiftController {

  private final WorkCommentService workCommentService;

  @Autowired
  public WorkShiftController(WorkCommentService workCommentService) {
    this.workCommentService = workCommentService;
  }

  @GetMapping
  public List<ShiftCommentDto> getByDate(@RequestParam(name = "date", required = false) Long millis) {
    return workCommentService.getShiftCommentsByDate(millis)
            .stream()
            .map(ShiftCommentDto::new)
            .collect(Collectors.toList());
  }

  @PostMapping("/comment")
  public ResponseEntity<ShiftCommentDto> createCommentDto(@RequestBody ShiftCommentDto shiftCommentDto) {
    User userFromToken = StaticCollection.getUser();
    ShiftComment shiftComment = new ShiftComment();

    shiftComment.setMessage(shiftCommentDto.getText());
    shiftComment.setUser(userFromToken);
    shiftComment.setDate(shiftCommentDto.getDate());
    shiftComment.setUser(StaticCollection.getUser());
    shiftComment.setPositions(workCommentService.getPositionByTitleIn(shiftCommentDto.getPositions()));

    workCommentService.addComment(shiftComment);

    return ResponseEntity.ok().build();
  }

  @PutMapping("/comment")
  public ResponseEntity<ShiftComment> updateComment(@RequestBody ShiftCommentDto shiftCommentDto) {
    User userFromToken = StaticCollection.getUser();

    ShiftComment shiftComment = new ShiftComment();

    shiftComment.setId(shiftCommentDto.getId());
    shiftComment.setUser(userFromToken);
    shiftComment.setMessage(shiftCommentDto.getText());
    shiftComment.setPositions(workCommentService.getPositionByTitleIn(shiftCommentDto.getPositions()));
    shiftComment.setDate(shiftCommentDto.getDate());

    try {
      return ResponseEntity.ok(workCommentService.updateComment(shiftComment, userFromToken));
    } catch (IllegalAccessException e) {
      return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
    }
  }

  @DeleteMapping("/comment/{id}")
  public ResponseEntity<ShiftComment> deleteComment(@PathVariable("id") ShiftComment shiftComment) {
    User userFromToken = StaticCollection.getUser();

    try {
      workCommentService.deleteComment(shiftComment, userFromToken);
    } catch (IllegalAccessException e) {
      return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
    }
    return ResponseEntity.ok().build();
  }

  @GetMapping("/schedule")
  public List<Schedule> getSchedule() {
    return workCommentService.getCurrentSchedule();
  }
}
