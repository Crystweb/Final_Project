package ua.danit.final_project.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ua.danit.final_project.entities.Position;
import ua.danit.final_project.entities.Schedule;
import ua.danit.final_project.repositories.ScheduleRepository;

import javax.persistence.EntityNotFoundException;
import java.util.Date;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class ScheduleServiceImpl implements ScheduleService {

  private final ScheduleRepository scheduleRepository;

  @Autowired
  public ScheduleServiceImpl(ScheduleRepository scheduleRepository) {
    this.scheduleRepository = scheduleRepository;
  }

  @Override
  public Schedule create(Schedule schedule) {
    schedule.setUuid(UUID.randomUUID().toString());
    return scheduleRepository.save(schedule);
  }

  @Override
  public Schedule update(Schedule schedule) {
    remove(schedule);

    Schedule newSchedule = new Schedule();
    newSchedule.setUuid(schedule.getUuid());
    newSchedule.setPosition(schedule.getPosition());
    newSchedule.setStart(schedule.getStart());
    newSchedule.setEnd(schedule.getEnd());
    newSchedule.setCreatedDate(schedule.getCreatedDate());
    return scheduleRepository.save(schedule);
  }

  @Override
  public Schedule remove(Schedule schedule) {
    schedule.setExpired(new Date());
    return scheduleRepository.save(schedule);
  }

  @Override
  public Schedule remove(Long id) {
    return remove(scheduleRepository.findById(id).orElseThrow(EntityNotFoundException::new));
  }

  @Override
  public List<Schedule> findByPosition(Position position) {
    return scheduleRepository.findAllByPositionAndExpired(position, null);
  }

  @Override
  public List<Schedule> findByDate(Date date) {
    List<Schedule> schedules = scheduleRepository.findAllByCreatedDateBefore(date);
    return schedules.stream()
        .filter(s -> s.getExpired() == null || s.getExpired().after(date))
        .collect(Collectors.toList());
  }
}
