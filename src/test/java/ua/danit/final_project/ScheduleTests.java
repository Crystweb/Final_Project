package ua.danit.final_project;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.mockito.stubbing.Answer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;
import ua.danit.final_project.entities.Schedule;
import ua.danit.final_project.repositories.ScheduleRepository;
import ua.danit.final_project.services.ScheduleService;

import java.util.LinkedList;
import java.util.List;

import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertNotEquals;
import static org.mockito.ArgumentMatchers.any;

@RunWith(SpringRunner.class)
@SpringBootTest
public class ScheduleTests {

  private static long mockId = 0;

  @Autowired
  private ScheduleService scheduleService;

  @MockBean
  private ScheduleRepository scheduleRepository;

  private Schedule schedule;

  @Before
  public void init() {
    Mockito.when(scheduleRepository.save(any()))
        .then((Answer<Schedule>) invocationMock -> {
          Schedule argument = invocationMock.getArgument(0);
          argument.setId(++mockId);
          return argument;
        });

    Mockito.when(scheduleRepository.findAllByPositionAndExpired(any(), any()))
        .then((Answer<List<Schedule>>) invocationMock -> {
          List<Schedule> mock = new LinkedList<>();
          mock.add(schedule);
          return mock;
        });

    schedule = new Schedule();
    schedule = scheduleService.create(schedule);
  }

  @Test
  public void scheduleAddedAndSaved() {
    assertNotEquals(0L, schedule.getId());
  }

  @Test
  public void scheduleExpiredAfterRemoval() {
    schedule = scheduleService.remove(schedule);

    assertNotNull(schedule.getExpired());
  }

  @Test
  public void onUpdateNewCreatedAndOldExpired() {
    Long oldId = schedule.getId();
    Long newId = scheduleService.update(schedule).getId();

    assertNotEquals(oldId, newId);
  }
}
