package ua.danit.final_project.services;

import ua.danit.final_project.entities.Position;
import ua.danit.final_project.entities.Schedule;

import java.util.Date;
import java.util.List;

public interface ScheduleService {

  Schedule create(Schedule schedule);

  Schedule remove(Schedule schedule);

  Schedule remove(Long id);

  Schedule update(Schedule schedule);

  List<Schedule> findByPosition(Position position);

  List<Schedule> findByDate(Date date);
}
