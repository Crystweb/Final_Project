package ua.danit.final_project.services.crud;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ua.danit.final_project.entities.Schedule;
import ua.danit.final_project.repositories.ScheduleRepository;

import javax.persistence.EntityNotFoundException;
import java.util.List;

@Service
public class ScheduleServiceCrudImpl implements ScheduleServiceCrud {

  private final ScheduleRepository scheduleRepository;

  @Autowired
  public ScheduleServiceCrudImpl(ScheduleRepository scheduleRepository) {
    this.scheduleRepository = scheduleRepository;
  }

  @Override
  public Schedule getById(Long id) {
    return scheduleRepository.findById(id).orElseThrow(EntityNotFoundException::new);
  }

  @Override
  public List<Schedule> getAll() {
    return scheduleRepository.findAll();
  }

  @Override
  public Schedule save(Schedule schedule) {
    return scheduleRepository.save(schedule);
  }

  @Override
  public void deleteById(Long id) {
    scheduleRepository.deleteById(id);
  }
}
