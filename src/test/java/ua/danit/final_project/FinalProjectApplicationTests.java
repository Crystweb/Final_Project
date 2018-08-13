package ua.danit.final_project;

import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import ua.danit.final_project.entities.Role;
import ua.danit.final_project.repositories.CommentRepo;
import ua.danit.final_project.repositories.RoleRepo;
import ua.danit.final_project.repositories.UserRepo;
import ua.danit.final_project.services.RoleService;

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

  @Test
  public void contextLoads() {
  }

  @Test
  public void dataDDLExecuted() {
    Assert.assertTrue(userRepo.findAll().size() > 0);
    Assert.assertTrue(roleRepo.findAll().size() > 0);
    Assert.assertTrue(commentRepo.findAll().size() > 0);
    Assert.assertTrue(commentRepo.findAll().size() > 1);
    Assert.assertTrue(roleRepo.findAll().size() > 1);
    Assert.assertTrue(userRepo.findAll().size() > 1);
  }


  @Test
  public void newRoleSaved() {
    Role actual = roleService.create("test");
    Role expected = roleService.findRole("test");

    Assert.assertEquals(expected, actual);
  }
}
