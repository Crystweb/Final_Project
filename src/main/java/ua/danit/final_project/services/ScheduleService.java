package ua.danit.final_project.services;

import ua.danit.final_project.entities.Schedule;

public interface ScheduleService {

  Schedule create(Schedule schedule);
  Schedule remove(Schedule schedule);
  Schedule findByPosition(Schedule schedule);
}
