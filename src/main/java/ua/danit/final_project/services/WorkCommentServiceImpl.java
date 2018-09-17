package ua.danit.final_project.services;

import org.joda.time.DateTime;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ua.danit.final_project.entities.Position;
import ua.danit.final_project.entities.Schedule;
import ua.danit.final_project.entities.ShiftComment;
import ua.danit.final_project.entities.User;
import ua.danit.final_project.repositories.PositionRepository;
import ua.danit.final_project.repositories.ScheduleRepository;
import ua.danit.final_project.repositories.ShiftCommentRepository;
import ua.danit.final_project.repositories.UserRepository;

import javax.persistence.EntityNotFoundException;
import java.sql.Timestamp;
import java.util.Date;
import java.util.List;

@Service
public class WorkCommentServiceImpl implements WorkCommentService {

  private final ShiftCommentRepository shiftCommentRepository;
  private final ScheduleRepository scheduleRepository;
  private final PositionRepository positionRepository;
  private final UserRepository userRepository;

  @Autowired
  public WorkCommentServiceImpl(ShiftCommentRepository shiftCommentRepository,
                                ScheduleRepository scheduleRepository,
                                PositionRepository positionRepository, UserRepository userRepository) {
    this.shiftCommentRepository = shiftCommentRepository;
    this.scheduleRepository = scheduleRepository;
    this.positionRepository = positionRepository;
    this.userRepository = userRepository;
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
  public void deleteComment(ShiftComment shiftComment, User userFromToken) throws IllegalAccessException {
    if (!shiftComment.getUser().getId().equals(userFromToken.getId())) {
      String message = "User dont have permission to delete this message - id: " + shiftComment.getId();
      throw new IllegalAccessException(message);
    }

    shiftCommentRepository.delete(shiftComment);
  }

  @Override
  public ShiftComment updateComment(ShiftComment shiftComment, User userFromToken) throws IllegalAccessException {
    if (!shiftComment.getUser().getId().equals(userFromToken.getId())) {
      String message = "User dont have permission to update this message - id: " + shiftComment.getId();
      throw new IllegalAccessException(message);
    }

    return shiftCommentRepository.save(shiftComment);
  }

  @Override
  public ShiftComment getCommentById(Long commentId) {
    return shiftCommentRepository.findById(commentId).orElseThrow(EntityNotFoundException::new);
  }

  @Override
  public List<Schedule> getCurrentSchedule() {
    return scheduleRepository.findDistinctByPositionIn(positionRepository.findAll());
  }

  @Override
  public List<Position> getPositionByTitleIn(List<String> titles) {
    return positionRepository.getPositionByTitleIn(titles);
  }

  @Override
  public User getUserById(Long userId) {
    return userRepository.getOne(userId);
  }
}



