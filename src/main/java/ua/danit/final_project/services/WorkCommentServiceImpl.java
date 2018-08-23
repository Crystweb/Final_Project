package ua.danit.final_project.services;

import org.joda.time.DateTime;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ua.danit.final_project.entities.ShiftComment;
import ua.danit.final_project.entities.User;
import ua.danit.final_project.entities.WorkShift;
import ua.danit.final_project.repositories.ShiftCommentRepository;
import ua.danit.final_project.repositories.WorkShiftRepository;

import javax.persistence.EntityNotFoundException;
import java.sql.Timestamp;
import java.util.Date;
import java.util.List;

@Service
public class WorkCommentServiceImpl implements WorkCommentService {

  private final WorkShiftRepository workShiftRepository;
  private final ShiftCommentRepository shiftCommentRepository;

  @Autowired
  public WorkCommentServiceImpl(WorkShiftRepository workShiftRepository,
                                ShiftCommentRepository shiftCommentRepository) {
    this.workShiftRepository = workShiftRepository;
    this.shiftCommentRepository = shiftCommentRepository;
  }

  @Override
  public List<WorkShift> getWorkShiftsByDate(Timestamp date) {
    DateTime searchDate = new DateTime(date).withTimeAtStartOfDay();
    Date from = searchDate.minusHours(4).toDate();
    Date to = searchDate.plusHours(28).toDate();
    return workShiftRepository.findAllByDateBetween(from, to);
  }

  @Override
  public List<ShiftComment> getComments(Long workShiftId) {
    return workShiftRepository
        .findById(workShiftId)
        .orElseThrow(EntityNotFoundException::new)
        .getShiftComments();
  }

  @Override
  public ShiftComment addComment(Long workShiftId, ShiftComment shiftComment) {
    WorkShift workShift = workShiftRepository.findById(workShiftId).orElseThrow(EntityNotFoundException::new);
    shiftComment.setWorkShift(workShift);

    User user = new User();
    user.setId(1L);
    shiftComment.setUser(user);

    return shiftCommentRepository.save(shiftComment);
  }
}
