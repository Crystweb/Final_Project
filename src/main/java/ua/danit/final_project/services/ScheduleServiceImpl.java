package ua.danit.final_project.services;

import org.springframework.beans.factory.annotation.Autowired;
import ua.danit.final_project.entities.Schedule;
import ua.danit.final_project.repositories.ScheduleRepository;

import java.util.*;
import java.util.stream.Collectors;

public class ScheduleServiceImpl implements ScheduleService {

  private final ScheduleRepository scheduleRepository;

  @Autowired
  public ScheduleServiceImpl(ScheduleRepository scheduleRepository) {
    this.scheduleRepository = scheduleRepository;
  }

  @Override
  public Schedule create(Schedule schedule) {
    schedule.setUuid(UUID.randomUUID().toString());
//    List<Schedule> actualSchedule = scheduleRepository.findAll().stream()
//        .filter(s -> s.getPosition().equals(schedule.getPosition()))
//        .filter(s -> s.getExpired() == null)
//        .filter(s -> s.getStart().after(schedule.getStart()))
//        .collect(Collectors.toList());
//
//    List<Schedule> newSchedules = cloneSchedules(actualSchedule);
//    Date now = new Date();
//    actualSchedule.forEach(s -> {
//      s.setExpired(now);
//      scheduleRepository.save(s);
//    });
//
//    newSchedules.forEach(s -> s.setSequenceNumber(s.getSequenceNumber() + 1));
//    return null;
  }

  @Override
  public Schedule remove(Schedule schedule) {
    return null;
  }

  @Override
  public Schedule findByPosition(Schedule schedule) {
    return null;
  }

  private List<Schedule> cloneSchedules(List<Schedule> schedules) {
    List<Schedule> copy = new ArrayList<>();
    Collections.copy(schedules, copy);
    copy.forEach(s -> s.setId(null));

    return copy;
  }
}
