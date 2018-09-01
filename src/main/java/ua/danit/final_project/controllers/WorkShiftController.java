package ua.danit.final_project.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import ua.danit.final_project.configuration.StaticCollection;
import ua.danit.final_project.entities.ShiftComment;
import ua.danit.final_project.services.WorkCommentService;
import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/workshift")
public class WorkShiftController {

  private final WorkCommentService workCommentService;

  @Autowired
  public WorkShiftController(WorkCommentService workCommentService) {
    this.workCommentService = workCommentService;
  }

  @GetMapping("/{ws_id}/{miliseconds}")
  public List<ShiftComment> getByDate(@PathVariable("miliseconds") Long miliseconds,
                                      @PathVariable("ws_id") Long workShiftId) {
    return workCommentService.getShiftCommentsByDate(miliseconds, workShiftId);
  }

  @GetMapping("/{ws_id}/comment")
  public List<ShiftComment> getComments(@PathVariable("ws_id") Long workShiftId) {
    return workCommentService.getComments(workShiftId);
  }

  @GetMapping("/{ws_id}")
  public ResponseEntity<List<ShiftComment>> getCommentsOfLastWorkShifts(@PathVariable("ws_id") Long workShiftId) {
    return ResponseEntity.ok(workCommentService.getCommentsOfLastWorkShifts(workShiftId));
  }

  @PostMapping("/{ws_id}/comment")
  public ResponseEntity<ShiftComment> createComment(@PathVariable("ws_id") Long id,
                                                    @RequestBody ShiftComment shiftComment) {
    shiftComment = workCommentService.addComment(id, shiftComment);

    URI location = ServletUriComponentsBuilder
            .fromCurrentRequest()
            .path("/{id}")
            .buildAndExpand(shiftComment.getId())
            .toUri();

    return ResponseEntity.created(location).build();
  }

  @PutMapping("/{ws_id}/comment")
  public ResponseEntity<ShiftComment> updateComment(@RequestBody ShiftComment shiftComment) {
    ShiftComment comment = workCommentService.getCommentById(shiftComment.getId());

    if (StaticCollection.getUser().getId() != comment.getUser().getId()) {
      return ResponseEntity.notFound().build();
    }

    comment.setMessage(shiftComment.getMessage());
    return ResponseEntity.ok(workCommentService.updateComment(comment));
  }

  @DeleteMapping("/{ws_id}/comment/{c_id}")
  public ResponseEntity<ShiftComment> deleteComment(@PathVariable("c_id") Long id) {
    ShiftComment comment = workCommentService.getCommentById(id);

    if (StaticCollection.getUser().getId() != comment.getUser().getId()) {
      return ResponseEntity.notFound().build();
    }

    workCommentService.deleteCommentById(id);
    return ResponseEntity.ok().build();
  }
}
