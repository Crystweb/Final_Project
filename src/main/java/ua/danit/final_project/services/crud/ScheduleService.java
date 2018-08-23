package ua.danit.final_project.services.crud;


import ua.danit.final_project.entities.Schedule;

import java.util.List;

public interface ScheduleService {

  Schedule getById(Long id);

  List<Schedule> getAll();

  Schedule save(Schedule schedule);

  void deleteById(Long id);
}
