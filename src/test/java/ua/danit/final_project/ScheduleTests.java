package ua.danit.final_project;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import ua.danit.final_project.entities.Position;
import ua.danit.final_project.entities.Schedule;
import ua.danit.final_project.repositories.PositionRepository;
import ua.danit.final_project.repositories.ScheduleRepository;
import ua.danit.final_project.services.ScheduleService;

import javax.persistence.EntityNotFoundException;
import java.sql.Time;

import static org.junit.Assert.*;

@RunWith(SpringRunner.class)
@SpringBootTest
public class ScheduleTests {

  @Autowired
  private ScheduleService scheduleService;

  @Autowired
  private PositionRepository positionRepository;

  @Autowired
  private ScheduleRepository scheduleRepository;

  private Schedule schedule;
  private Position position;

  @Before
  public void init() {
    schedule = new Schedule();
    schedule.setStart(new Time(1534763270));
    schedule.setEnd(new Time(1534764000));

    position = new Position();
    position.setPinnedToComment(true);
    position.setTitle("mock");
    position = positionRepository.save(position);

    schedule.setPosition(position);
    schedule = scheduleService.create(schedule);
  }

  @After
  public void purge() {
    scheduleRepository.delete(schedule);
    positionRepository.delete(position);
  }

  @Test
  public void scheduleAddedAndSaved() {
    assertTrue(scheduleService.findByPosition(position).size() > 0);
  }

  @Test
  public void scheduleExpiredAfterRemoval() {
    Long id = scheduleRepository.findById(schedule.getId())
        .orElseThrow(EntityNotFoundException::new)
        .getId();
    schedule = scheduleService.remove(schedule);
    Schedule removed = scheduleRepository.findById(id).orElse(null);

    assertNotNull(removed);
    assertNotNull(schedule.getExpired());
  }

  @Test
  public void onUpdateNewCreatedAndOldExpired() {
    schedule.setEnd(new Time(System.currentTimeMillis()));

    Long oldId = schedule.getId();
    Long newId = scheduleService.update(schedule).getId();

    assertNotEquals(oldId, newId);
    scheduleRepository.deleteById(newId);
  }
}
