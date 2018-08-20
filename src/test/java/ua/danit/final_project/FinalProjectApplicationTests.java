package ua.danit.final_project;

import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import ua.danit.final_project.entities.BedLinenStats;
import ua.danit.final_project.entities.BedLinenType;
import ua.danit.final_project.entities.CleaningMaterial;
import ua.danit.final_project.entities.Consumer;
import ua.danit.final_project.entities.DishAccounting;
import ua.danit.final_project.services.BedLinenStatsService;
import ua.danit.final_project.services.BedLinenTypeService;
import ua.danit.final_project.services.CleaningMaterialService;
import ua.danit.final_project.services.ConsumerService;
import ua.danit.final_project.services.DishAccountingService;
import ua.danit.final_project.services.UserService;

import javax.persistence.EntityNotFoundException;
import java.sql.Timestamp;

@RunWith(SpringRunner.class)
@SpringBootTest
public class FinalProjectApplicationTests {

  @Autowired
  BedLinenStatsService bedLinenStatsService;

  @Autowired
  UserService userService;

  @Autowired
  BedLinenTypeService bedLinenTypeService;

  @Autowired
  CleaningMaterialService cleaningMaterialService;

  @Autowired
  ConsumerService consumerService;

  @Autowired
  DishAccountingService dishAccountingService;

  @Test
  public void contextLoads() {
  }

  @Test
  public void BedLinenStatsCRUD() { //json
    BedLinenStats data = new BedLinenStats();
    data.setUser(userService.getById(1l));
    data.setBedLinenType(bedLinenTypeService.getById(1l));
    data.setAmount(10);
    data.setDate(new Timestamp(System.currentTimeMillis()));

    BedLinenStats actualPOST = bedLinenStatsService.save(data);
    Assert.assertEquals(data, actualPOST);

    BedLinenStats actualGET = bedLinenStatsService.getById(data.getId());
    Assert.assertEquals(data, actualGET);

    data.setAmount(20);
    BedLinenStats actualPUT = bedLinenStatsService.save(data);
    Assert.assertEquals(data, actualPUT);

    bedLinenStatsService.deleteById(data.getId());
    BedLinenStats actualDELETE = bedLinenStatsService.getById(data.getId());
  }

  @Test
  public void BedLinenTypeCRUD() {
    BedLinenType data = new BedLinenType();
    data.setTitle("home");

    BedLinenType actualPOST = bedLinenTypeService.save(data);
    Assert.assertEquals(data, actualPOST);

    BedLinenType actualGET = bedLinenTypeService.getById(data.getId());
    Assert.assertEquals(data, actualGET);

    data.setTitle("hotel");
    BedLinenType actualPUT = bedLinenTypeService.save(data);
    Assert.assertEquals(data, actualPUT);

    bedLinenTypeService.deleteById(data.getId());
    try {
      BedLinenType actualDELETE = bedLinenTypeService.getById(data.getId());
      Assert.assertNull(actualDELETE);
    } catch (EntityNotFoundException ex) {
      Assert.assertNull(null);
    }
  }

  @Test
  public void CleaningMaterialCRUD() {
    CleaningMaterial data = new CleaningMaterial();
    data.setTitle("magic");

    CleaningMaterial actualPOST = cleaningMaterialService.save(data);
    Assert.assertEquals(data, actualPOST);

    CleaningMaterial actualGET = cleaningMaterialService.getById(data.getId());
    Assert.assertEquals(data, actualGET);

    data.setTitle("second level magic");
    CleaningMaterial actualPUT = cleaningMaterialService.save(data);
    Assert.assertEquals(data, actualPUT);

    cleaningMaterialService.deleteById(data.getId());
    try {
      CleaningMaterial actualDELETE = cleaningMaterialService.getById(data.getId());
      Assert.assertNull(actualDELETE);
    } catch (EntityNotFoundException ex) {
      Assert.assertNull(null);
    }


  }

  @Test
  public void ConsumerCRUD() {
    Consumer data = new Consumer();
    data.setName("new consumer");
    data.setDescription("bla 1");

    Consumer actualPOST = consumerService.save(data);
    Assert.assertEquals(data, actualPOST);

    Consumer actualGET = consumerService.getById(data.getId());
    Assert.assertEquals(data, actualGET);

    data.setName("changed new consumer");
    Consumer actualPUT = consumerService.save(data);
    Assert.assertEquals(data, actualPUT);

    consumerService.deleteById(data.getId());
    try {
      Consumer actualDELETE = consumerService.getById(data.getId());
      Assert.assertNull(actualDELETE);
    } catch (EntityNotFoundException ex) {
      Assert.assertNull(null);
    }
  }

  @Test
  public void DishAccountingCRUD() {
    DishAccounting data = new DishAccounting();
    data.setDishType();
    data.setLocation();
    data.setUser();
    data.setDelta();
    data.setDate();

    DishAccounting actualPOST = dishAccountingService.save(data);
    Assert.assertEquals(data, actualPOST);

    DishAccounting actualGET = dishAccountingService.getById(data.getId());
    Assert.assertEquals(data, actualGET);

    data.setDate("changed new consumer");
    DishAccounting actualPUT = dishAccountingService.save(data);
    Assert.assertEquals(data, actualPUT);

    dishAccountingService.deleteById(data.getId());
    try {
      DishAccounting actualDELETE = dishAccountingService.getById(data.getId());
      Assert.assertNull(actualDELETE);
    } catch (EntityNotFoundException ex) {
      Assert.assertNull(null);
    }

  }

  @Test
  public void DishBalanceCRUD() {

    Consumer actualPOST = consumerService.save(data);
    Assert.assertEquals(data, actualPOST);

    Consumer actualGET = consumerService.getById(data.getId());
    Assert.assertEquals(data, actualGET);

    data.setName("changed new consumer");
    Consumer actualPUT = consumerService.save(data);
    Assert.assertEquals(data, actualPUT);

    consumerService.deleteById(data.getId());
    try {
      Consumer actualDELETE = consumerService.getById(data.getId());
      Assert.assertNull(actualDELETE);
    } catch (EntityNotFoundException ex) {
      Assert.assertNull(null);
    }

  }

  @Test
  public void DishCommentCRUD() {

    Consumer actualPOST = consumerService.save(data);
    Assert.assertEquals(data, actualPOST);

    Consumer actualGET = consumerService.getById(data.getId());
    Assert.assertEquals(data, actualGET);

    data.setName("changed new consumer");
    Consumer actualPUT = consumerService.save(data);
    Assert.assertEquals(data, actualPUT);

    consumerService.deleteById(data.getId());
    try {
      Consumer actualDELETE = consumerService.getById(data.getId());
      Assert.assertNull(actualDELETE);
    } catch (EntityNotFoundException ex) {
      Assert.assertNull(null);
    }

  }

  @Test
  public void DishTypeCRUD() {

    Consumer actualPOST = consumerService.save(data);
    Assert.assertEquals(data, actualPOST);

    Consumer actualGET = consumerService.getById(data.getId());
    Assert.assertEquals(data, actualGET);

    data.setName("changed new consumer");
    Consumer actualPUT = consumerService.save(data);
    Assert.assertEquals(data, actualPUT);

    consumerService.deleteById(data.getId());
    try {
      Consumer actualDELETE = consumerService.getById(data.getId());
      Assert.assertNull(actualDELETE);
    } catch (EntityNotFoundException ex) {
      Assert.assertNull(null);
    }

  }

  @Test
  public void EmployeeCRUD() {

    Consumer actualPOST = consumerService.save(data);
    Assert.assertEquals(data, actualPOST);

    Consumer actualGET = consumerService.getById(data.getId());
    Assert.assertEquals(data, actualGET);

    data.setName("changed new consumer");
    Consumer actualPUT = consumerService.save(data);
    Assert.assertEquals(data, actualPUT);

    consumerService.deleteById(data.getId());
    try {
      Consumer actualDELETE = consumerService.getById(data.getId());
      Assert.assertNull(actualDELETE);
    } catch (EntityNotFoundException ex) {
      Assert.assertNull(null);
    }

  }

  @Test
  public void FoodSupplyCRUD() {

    Consumer actualPOST = consumerService.save(data);
    Assert.assertEquals(data, actualPOST);

    Consumer actualGET = consumerService.getById(data.getId());
    Assert.assertEquals(data, actualGET);

    data.setName("changed new consumer");
    Consumer actualPUT = consumerService.save(data);
    Assert.assertEquals(data, actualPUT);

    consumerService.deleteById(data.getId());
    try {
      Consumer actualDELETE = consumerService.getById(data.getId());
      Assert.assertNull(actualDELETE);
    } catch (EntityNotFoundException ex) {
      Assert.assertNull(null);
    }

  }

  @Test
  public void LocationCRUD() {

    Consumer actualPOST = consumerService.save(data);
    Assert.assertEquals(data, actualPOST);

    Consumer actualGET = consumerService.getById(data.getId());
    Assert.assertEquals(data, actualGET);

    data.setName("changed new consumer");
    Consumer actualPUT = consumerService.save(data);
    Assert.assertEquals(data, actualPUT);

    consumerService.deleteById(data.getId());
    try {
      Consumer actualDELETE = consumerService.getById(data.getId());
      Assert.assertNull(actualDELETE);
    } catch (EntityNotFoundException ex) {
      Assert.assertNull(null);
    }

  }

  @Test
  public void MealTimeCategoryCRUD() {

    Consumer actualPOST = consumerService.save(data);
    Assert.assertEquals(data, actualPOST);

    Consumer actualGET = consumerService.getById(data.getId());
    Assert.assertEquals(data, actualGET);

    data.setName("changed new consumer");
    Consumer actualPUT = consumerService.save(data);
    Assert.assertEquals(data, actualPUT);

    consumerService.deleteById(data.getId());
    try {
      Consumer actualDELETE = consumerService.getById(data.getId());
      Assert.assertNull(actualDELETE);
    } catch (EntityNotFoundException ex) {
      Assert.assertNull(null);
    }

  }

  @Test
  public void PermissionCRUD() {

    Consumer actualPOST = consumerService.save(data);
    Assert.assertEquals(data, actualPOST);

    Consumer actualGET = consumerService.getById(data.getId());
    Assert.assertEquals(data, actualGET);

    data.setName("changed new consumer");
    Consumer actualPUT = consumerService.save(data);
    Assert.assertEquals(data, actualPUT);

    consumerService.deleteById(data.getId());
    try {
      Consumer actualDELETE = consumerService.getById(data.getId());
      Assert.assertNull(actualDELETE);
    } catch (EntityNotFoundException ex) {
      Assert.assertNull(null);
    }

  }

  @Test
  public void PositionCRUD() {

    Consumer actualPOST = consumerService.save(data);
    Assert.assertEquals(data, actualPOST);

    Consumer actualGET = consumerService.getById(data.getId());
    Assert.assertEquals(data, actualGET);

    data.setName("changed new consumer");
    Consumer actualPUT = consumerService.save(data);
    Assert.assertEquals(data, actualPUT);

    consumerService.deleteById(data.getId());
    try {
      Consumer actualDELETE = consumerService.getById(data.getId());
      Assert.assertNull(actualDELETE);
    } catch (EntityNotFoundException ex) {
      Assert.assertNull(null);
    }

  }

  @Test
  public void RoleCRUD() {

    Consumer actualPOST = consumerService.save(data);
    Assert.assertEquals(data, actualPOST);

    Consumer actualGET = consumerService.getById(data.getId());
    Assert.assertEquals(data, actualGET);

    data.setName("changed new consumer");
    Consumer actualPUT = consumerService.save(data);
    Assert.assertEquals(data, actualPUT);

    consumerService.deleteById(data.getId());
    try {
      Consumer actualDELETE = consumerService.getById(data.getId());
      Assert.assertNull(actualDELETE);
    } catch (EntityNotFoundException ex) {
      Assert.assertNull(null);
    }

  }

  @Test
  public void ScheduleCRUD() {

    Consumer actualPOST = consumerService.save(data);
    Assert.assertEquals(data, actualPOST);

    Consumer actualGET = consumerService.getById(data.getId());
    Assert.assertEquals(data, actualGET);

    data.setName("changed new consumer");
    Consumer actualPUT = consumerService.save(data);
    Assert.assertEquals(data, actualPUT);

    consumerService.deleteById(data.getId());
    try {
      Consumer actualDELETE = consumerService.getById(data.getId());
      Assert.assertNull(actualDELETE);
    } catch (EntityNotFoundException ex) {
      Assert.assertNull(null);
    }

  }

  @Test
  public void ShiftCommentCRUD() {

    Consumer actualPOST = consumerService.save(data);
    Assert.assertEquals(data, actualPOST);

    Consumer actualGET = consumerService.getById(data.getId());
    Assert.assertEquals(data, actualGET);

    data.setName("changed new consumer");
    Consumer actualPUT = consumerService.save(data);
    Assert.assertEquals(data, actualPUT);

    consumerService.deleteById(data.getId());
    try {
      Consumer actualDELETE = consumerService.getById(data.getId());
      Assert.assertNull(actualDELETE);
    } catch (EntityNotFoundException ex) {
      Assert.assertNull(null);
    }

  }

  @Test
  public void TaskCommentCRUD() {

    Consumer actualPOST = consumerService.save(data);
    Assert.assertEquals(data, actualPOST);

    Consumer actualGET = consumerService.getById(data.getId());
    Assert.assertEquals(data, actualGET);

    data.setName("changed new consumer");
    Consumer actualPUT = consumerService.save(data);
    Assert.assertEquals(data, actualPUT);

    consumerService.deleteById(data.getId());
    try {
      Consumer actualDELETE = consumerService.getById(data.getId());
      Assert.assertNull(actualDELETE);
    } catch (EntityNotFoundException ex) {
      Assert.assertNull(null);
    }

  }

  @Test
  public void UserCRUD() {

    Consumer actualPOST = consumerService.save(data);
    Assert.assertEquals(data, actualPOST);

    Consumer actualGET = consumerService.getById(data.getId());
    Assert.assertEquals(data, actualGET);

    data.setName("changed new consumer");
    Consumer actualPUT = consumerService.save(data);
    Assert.assertEquals(data, actualPUT);

    consumerService.deleteById(data.getId());
    try {
      Consumer actualDELETE = consumerService.getById(data.getId());
      Assert.assertNull(actualDELETE);
    } catch (EntityNotFoundException ex) {
      Assert.assertNull(null);
    }

  }

  @Test
  public void VacancyCommentCRUD() {

    Consumer actualPOST = consumerService.save(data);
    Assert.assertEquals(data, actualPOST);

    Consumer actualGET = consumerService.getById(data.getId());
    Assert.assertEquals(data, actualGET);

    data.setName("changed new consumer");
    Consumer actualPUT = consumerService.save(data);
    Assert.assertEquals(data, actualPUT);

    consumerService.deleteById(data.getId());
    try {
      Consumer actualDELETE = consumerService.getById(data.getId());
      Assert.assertNull(actualDELETE);
    } catch (EntityNotFoundException ex) {
      Assert.assertNull(null);
    }

  }

  @Test
  public void VacancyCRUD() {

    Consumer actualPOST = consumerService.save(data);
    Assert.assertEquals(data, actualPOST);

    Consumer actualGET = consumerService.getById(data.getId());
    Assert.assertEquals(data, actualGET);

    data.setName("changed new consumer");
    Consumer actualPUT = consumerService.save(data);
    Assert.assertEquals(data, actualPUT);

    consumerService.deleteById(data.getId());
    try {
      Consumer actualDELETE = consumerService.getById(data.getId());
      Assert.assertNull(actualDELETE);
    } catch (EntityNotFoundException ex) {
      Assert.assertNull(null);
    }

  }

  @Test
  public void WashPeriodCRUD() {

    Consumer actualPOST = consumerService.save(data);
    Assert.assertEquals(data, actualPOST);

    Consumer actualGET = consumerService.getById(data.getId());
    Assert.assertEquals(data, actualGET);

    data.setName("changed new consumer");
    Consumer actualPUT = consumerService.save(data);
    Assert.assertEquals(data, actualPUT);

    consumerService.deleteById(data.getId());
    try {
      Consumer actualDELETE = consumerService.getById(data.getId());
      Assert.assertNull(actualDELETE);
    } catch (EntityNotFoundException ex) {
      Assert.assertNull(null);
    }

  }

  @Test
  public void WashStatsMaterialCRUD() {

    Consumer actualPOST = consumerService.save(data);
    Assert.assertEquals(data, actualPOST);

    Consumer actualGET = consumerService.getById(data.getId());
    Assert.assertEquals(data, actualGET);

    data.setName("changed new consumer");
    Consumer actualPUT = consumerService.save(data);
    Assert.assertEquals(data, actualPUT);

    consumerService.deleteById(data.getId());
    try {
      Consumer actualDELETE = consumerService.getById(data.getId());
      Assert.assertNull(actualDELETE);
    } catch (EntityNotFoundException ex) {
      Assert.assertNull(null);
    }

  }

  @Test
  public void WashStatsCRUD() {

    Consumer actualPOST = consumerService.save(data);
    Assert.assertEquals(data, actualPOST);

    Consumer actualGET = consumerService.getById(data.getId());
    Assert.assertEquals(data, actualGET);

    data.setName("changed new consumer");
    Consumer actualPUT = consumerService.save(data);
    Assert.assertEquals(data, actualPUT);

    consumerService.deleteById(data.getId());
    try {
      Consumer actualDELETE = consumerService.getById(data.getId());
      Assert.assertNull(actualDELETE);
    } catch (EntityNotFoundException ex) {
      Assert.assertNull(null);
    }

  }

  @Test
  public void WorkShiftCRUD() {

    Consumer actualPOST = consumerService.save(data);
    Assert.assertEquals(data, actualPOST);

    Consumer actualGET = consumerService.getById(data.getId());
    Assert.assertEquals(data, actualGET);

    data.setName("changed new consumer");
    Consumer actualPUT = consumerService.save(data);
    Assert.assertEquals(data, actualPUT);

    consumerService.deleteById(data.getId());
    try {
      Consumer actualDELETE = consumerService.getById(data.getId());
      Assert.assertNull(actualDELETE);
    } catch (EntityNotFoundException ex) {
      Assert.assertNull(null);
    }

  }
}



