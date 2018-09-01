package ua.danit.final_project.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import ua.danit.final_project.entities.ShiftComment;
import ua.danit.final_project.entities.WorkShift;
import ua.danit.final_project.services.WorkCommentService;

import java.net.URI;
import java.sql.Timestamp;
import java.util.List;

@RestController
@RequestMapping("/workshift")
public class WorkShiftController {

  private final WorkCommentService workCommentService;

  @Autowired
  public WorkShiftController(WorkCommentService workCommentService) {
    this.workCommentService = workCommentService;
  }

  @GetMapping
  public List<WorkShift> getByDate(@RequestParam(required = false) Timestamp date) {
    return workCommentService.getWorkShiftsByDate(date);
  }

  @GetMapping("/{id}/comment")
  public List<ShiftComment> getComments(@PathVariable("id") Long workShiftId) {
    return workCommentService.getComments(workShiftId);
  }

  @PostMapping("/{id}/comment")
  public ResponseEntity<ShiftComment> createComment(@PathVariable("id") Long id,
                                                    @RequestBody ShiftComment shiftComment) {
    shiftComment = workCommentService.addComment(id, shiftComment);

    URI location = ServletUriComponentsBuilder
            .fromCurrentRequest()
            .path("/{id}")
            .buildAndExpand(shiftComment.getId())
            .toUri();

    return ResponseEntity.created(location).build();
  }
}
