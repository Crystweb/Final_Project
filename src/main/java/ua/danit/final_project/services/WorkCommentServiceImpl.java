package ua.danit.final_project.services;

import org.joda.time.DateTime;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ua.danit.final_project.entities.ShiftComment;
import ua.danit.final_project.repositories.ShiftCommentRepository;

import javax.persistence.EntityNotFoundException;
import java.sql.Timestamp;
import java.util.Date;
import java.util.List;

@Service
public class WorkCommentServiceImpl implements WorkCommentService {

  private final ShiftCommentRepository shiftCommentRepository;

  @Autowired
  public WorkCommentServiceImpl(ShiftCommentRepository shiftCommentRepository) {
    this.shiftCommentRepository = shiftCommentRepository;
  }

  @Override
  public List<ShiftComment> getShiftCommentsByDate(Long milliseconds) {
    if (milliseconds == null) {
      return shiftCommentRepository.findAllByDateAfter(DateTime.now().minusDays(1).toDate());
    }
    Timestamp date = new Timestamp(milliseconds);
    DateTime searchDate = new DateTime(date).withTimeAtStartOfDay();
    Date from = searchDate.toDate();
    Date to = searchDate.plusHours(24).toDate();
    return shiftCommentRepository.findAllByDateBetween(from, to);
  }

  @Override
  public ShiftComment addComment(ShiftComment shiftComment) {
    return shiftCommentRepository.save(shiftComment);
  }

  @Override
  public void deleteCommentById(Long commentId) {
    shiftCommentRepository.deleteById(commentId);
  }

  @Override
  public ShiftComment updateComment(ShiftComment shiftComment) {
    return shiftCommentRepository.save(shiftComment);
  }

  @Override
  public List<ShiftComment> getCommentsOfLastWorkShifts() {
    Timestamp date = new Timestamp(System.currentTimeMillis());
    DateTime searchDate = new DateTime(date);
    Date from = searchDate.toDate();
    Date to = searchDate.minusHours(24).toDate();

    return shiftCommentRepository.findAllByDateBetween(from, to);
  }

  @Override
  public ShiftComment getCommentById(Long commentId) {
    return shiftCommentRepository.findById(commentId).orElseThrow(EntityNotFoundException::new);
  }
}
