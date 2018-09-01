package ua.danit.final_project.services;

import org.joda.time.DateTime;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ua.danit.final_project.configuration.StaticCollection;
import ua.danit.final_project.entities.ShiftComment;
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
  public List<ShiftComment> getShiftCommentsByDate(Long miliseconds, Long workShiftId) {
    Timestamp date = new Timestamp(miliseconds);
    DateTime searchDate = new DateTime(date).withTimeAtStartOfDay();
    Date from = searchDate.toDate();
    Date to = searchDate.plusHours(24).toDate();
    return shiftCommentRepository.findAllByDateBetweenAndWorkShift_Id(from, to, workShiftId);
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

    shiftComment.setUser(StaticCollection.getUser());

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
  public List<ShiftComment> getCommentsOfLastWorkShifts(Long workShiftId) {
    Integer id = shiftCommentRepository.getMaxId();
    Long maxId = Long.parseLong("" + (id - 2));

    return shiftCommentRepository.getAllByLastThreeWorkShiftId(maxId, workShiftId);
  }

  @Override
  public ShiftComment getCommentById(Long commentId) {
    return shiftCommentRepository.findById(commentId).orElseThrow(EntityNotFoundException::new);
  }
}