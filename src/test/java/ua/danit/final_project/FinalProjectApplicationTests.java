package ua.danit.final_project;

import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import ua.danit.final_project.repositories.UserRepo;

@RunWith(SpringRunner.class)
@SpringBootTest
public class FinalProjectApplicationTests {

  @Autowired
  UserRepo userRepo;

  @Test
  public void contextLoads() {
  }

  @Test
  public void dataDDLExecuted() {
    Assert.assertTrue(userRepo.findAll().size() > 0);
  }

}
