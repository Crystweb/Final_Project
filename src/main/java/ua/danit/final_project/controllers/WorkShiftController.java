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
import ua.danit.final_project.configuration.SessionAware;
import ua.danit.final_project.dto.DefaultMapper;
import ua.danit.final_project.entities.Schedule;
import ua.danit.final_project.dto.ShiftCommentDto;
import ua.danit.final_project.entities.ShiftComment;
import ua.danit.final_project.entities.User;
import ua.danit.final_project.services.WorkCommentService;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/workshift")
public class WorkShiftController extends SessionAware {

  private final WorkCommentService workCommentService;
  private final DefaultMapper mapper;

  @Autowired
  public WorkShiftController(WorkCommentService workCommentService,
                             DefaultMapper mapper) {
    this.workCommentService = workCommentService;
    this.mapper = mapper;
  }

  @GetMapping
  public List<ShiftCommentDto> getByDate(@RequestParam(name = "date", required = false) Long millis) {
    return workCommentService.getShiftCommentsByDate(millis)
            .stream()
            .map(mapper::shiftCommentToShiftCommentDto)
            .collect(Collectors.toList());
  }

  @PostMapping("/comment")
  public ShiftCommentDto createComment(@RequestBody ShiftCommentDto shiftCommentDto) {
    User userFromToken = getCurrentUser();
    ShiftComment shiftComment = mapper.shiftCommentDtoToShiftComment(shiftCommentDto);
    shiftComment.setAuthor(userFromToken.getEmployee());

    shiftComment = workCommentService.addComment(shiftComment);

    return mapper.shiftCommentToShiftCommentDto(shiftComment);
  }

  @PutMapping("/comment")
  public ShiftCommentDto updateComment(@RequestBody ShiftCommentDto shiftCommentDto) throws IllegalAccessException {
    User userFromToken = getCurrentUser();
    ShiftComment shiftComment = mapper.shiftCommentDtoToShiftComment(shiftCommentDto);
    shiftComment = workCommentService.updateComment(shiftComment, userFromToken);

    return mapper.shiftCommentToShiftCommentDto(shiftComment);
  }

  @DeleteMapping("/comment/{id}")
  public ResponseEntity<ShiftComment> deleteComment(@PathVariable("id") ShiftComment shiftComment) {
    User userFromToken = getCurrentUser();

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