package ua.danit.final_project;

import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import ua.danit.final_project.entities.Employee;
import ua.danit.final_project.entities.Role;
import ua.danit.final_project.entities.Vacancy;
import ua.danit.final_project.entities.Schedule;
import ua.danit.final_project.repositories.CommentRepo;
import ua.danit.final_project.repositories.EmployeeRepo;
import ua.danit.final_project.repositories.RoleRepo;
import ua.danit.final_project.repositories.ScheduleRepo;
import ua.danit.final_project.repositories.UserRepo;
import ua.danit.final_project.services.EmployeeService;
import ua.danit.final_project.services.RoleService;
import ua.danit.final_project.services.VacancyService;

import javax.persistence.EntityNotFoundException;
import java.sql.Timestamp;

@RunWith(SpringRunner.class)
@SpringBootTest
public class FinalProjectApplicationTests {

  @Autowired
  UserRepo userRepo;

  @Autowired
  RoleRepo roleRepo;

  @Autowired
  CommentRepo commentRepo;

  @Autowired
  RoleService roleService;

  @Autowired
  VacancyService vacancyService;
  
  @Autowired
  EmployeeRepo employeeRepo;

  @Autowired
  EmployeeService employeeService;

  @Autowired
  ScheduleRepo scheduleRepo;


  @Test
  public void contextLoads() {
  }

  @Test
  public void dataDDLExecuted() {
    Assert.assertTrue(userRepo.findAll().size() > 0);
    Assert.assertTrue(roleRepo.findAll().size() > 0);
    Assert.assertTrue(commentRepo.findAll().size() > 0);
  }


  @Test
  public void newRoleSaved() {
    Role actual = roleService.create("test");
    Role expected = roleService.findRole("test");

    Assert.assertEquals(expected, actual);
  }

  @Test
  public void newVacancySave() {
    Vacancy actual = vacancyService.create("Povar", 10000, System.currentTimeMillis());
    Vacancy expected = vacancyService.findAll().get(2);
    Assert.assertEquals(expected, actual);
  }

  @Test
  public void newEmployeeSaved() {
    Employee actual = employeeService.addEmployee(3L,
            "vas",
            "vasyl",
            "vasylovich",
            "0645668093",
            "hero");
    Employee expected = employeeService.getAll().get(2);

    Assert.assertEquals(expected, actual);
  }

  @Test
  public void newScheduleCreated() {
    Schedule schedule = new Schedule();
    schedule.setStart(new Timestamp(System.currentTimeMillis()));
    schedule.setEnd(new Timestamp(System.currentTimeMillis()));
    schedule.setRole(roleRepo.findById(1L).orElseThrow(EntityNotFoundException::new));

    schedule = scheduleRepo.save(schedule);
    Assert.assertNotNull(scheduleRepo.findById(schedule.getId()).orElse(null));
  }
}
