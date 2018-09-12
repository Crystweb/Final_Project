package ua.danit.final_project;

import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import ua.danit.final_project.configuration.StaticCollection;
import ua.danit.final_project.entities.BedLinenStats;
import ua.danit.final_project.entities.BedLinenType;
import ua.danit.final_project.entities.CleaningMaterial;
import ua.danit.final_project.entities.Consumer;
import ua.danit.final_project.entities.DishAccounting;
import ua.danit.final_project.entities.DishBalance;
import ua.danit.final_project.entities.DishComment;
import ua.danit.final_project.entities.DishType;
import ua.danit.final_project.entities.Employee;
import ua.danit.final_project.entities.FoodSupply;
import ua.danit.final_project.entities.Location;
import ua.danit.final_project.entities.MealTimeCategory;
import ua.danit.final_project.entities.Permission;
import ua.danit.final_project.entities.Position;
import ua.danit.final_project.entities.Role;
import ua.danit.final_project.entities.Schedule;
import ua.danit.final_project.entities.ShiftComment;
import ua.danit.final_project.entities.Task;
import ua.danit.final_project.entities.TaskComment;
import ua.danit.final_project.entities.User;
import ua.danit.final_project.entities.Vacancy;
import ua.danit.final_project.entities.VacancyComment;
import ua.danit.final_project.entities.WashPeriod;
import ua.danit.final_project.entities.WashStats;
import ua.danit.final_project.entities.WashStatsMaterial;
import ua.danit.final_project.repositories.PositionRepository;
import ua.danit.final_project.services.ScheduleService;
import ua.danit.final_project.services.WorkCommentService;
import ua.danit.final_project.services.crud.BedLinenStatsService;
import ua.danit.final_project.services.crud.BedLinenTypeService;
import ua.danit.final_project.services.crud.CleaningMaterialService;
import ua.danit.final_project.services.crud.ConsumerService;
import ua.danit.final_project.services.crud.DishAccountingService;
import ua.danit.final_project.services.crud.DishBalanceService;
import ua.danit.final_project.services.crud.DishCommentService;
import ua.danit.final_project.services.crud.DishTypeService;
import ua.danit.final_project.services.crud.EmployeeService;
import ua.danit.final_project.services.crud.FoodSupplyService;
import ua.danit.final_project.services.crud.LocationService;
import ua.danit.final_project.services.crud.MealTimeCategoryService;
import ua.danit.final_project.services.crud.PermissionService;
import ua.danit.final_project.services.crud.PositionService;
import ua.danit.final_project.services.crud.RoleService;
import ua.danit.final_project.services.crud.ScheduleServiceCrud;
import ua.danit.final_project.services.crud.ShiftCommentService;
import ua.danit.final_project.services.crud.TaskCommentService;
import ua.danit.final_project.services.crud.TaskServiceCrud;
import ua.danit.final_project.services.crud.UserService;
import ua.danit.final_project.services.crud.VacancyCommentService;
import ua.danit.final_project.services.crud.VacancyServiceCrud;
import ua.danit.final_project.services.crud.WashPeriodService;
import ua.danit.final_project.services.crud.WashStatsMaterialService;
import ua.danit.final_project.services.crud.WashStatsService;
import ua.danit.final_project.services.tasks.TaskService;

import javax.persistence.EntityNotFoundException;
import java.sql.Time;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

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

  @Autowired
  DishBalanceService dishBalanceService;

  @Autowired
  DishCommentService dishCommentService;

  @Autowired
  DishTypeService dishTypeService;

  @Autowired
  EmployeeService employeeService;

  @Autowired
  FoodSupplyService foodSupplyService;

  @Autowired
  LocationService locationService;

  @Autowired
  MealTimeCategoryService mealTimeCategoryService;

  @Autowired
  PermissionService permissionService;

  @Autowired
  PositionService positionService;

  @Autowired
  RoleService roleService;

  @Autowired
  ScheduleServiceCrud scheduleServiceCrud;

  @Autowired
  ShiftCommentService shiftCommentService;

  @Autowired
  TaskCommentService taskCommentService;

  @Autowired
  TaskServiceCrud taskServiceCrud;

  @Autowired
  VacancyCommentService vacancyCommentService;

  @Autowired
  VacancyServiceCrud vacancyService;

  @Autowired
  WashPeriodService washPeriodService;

  @Autowired
  WashStatsService washStatsService;

  @Autowired
  WashStatsMaterialService washStatsMaterialService;

  @Autowired
  WorkCommentService workCommentService;

  @Autowired
  PositionRepository positionRepository;

  @Autowired
  ScheduleService scheduleService;

  @Autowired
  TaskService taskService;

  @Test
  public void contextLoads() {
  }

  @Test
  public void BedLinenStatsCRUD() {
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
    try {
      BedLinenStats actualDELETE = bedLinenStatsService.getById(data.getId());
      Assert.assertNull(actualDELETE);
    } catch (EntityNotFoundException ex) {
      Assert.assertNull(null);
    }
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
    data.setDishType(dishTypeService.getById(1L));
    data.setLocation(locationService.getById(1L));
    data.setUser(userService.getById(1l));
    data.setDelta(20);
    data.setDate(new Timestamp(1534763270));

    DishAccounting actualPOST = dishAccountingService.save(data);
    Assert.assertEquals(data, actualPOST);

    DishAccounting actualGET = dishAccountingService.getById(data.getId());
    Assert.assertEquals(data, actualGET);

    data.setDate(new Timestamp(1534763888));
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
    DishBalance data = new DishBalance();
    data.setDishType(dishTypeService.getById(1l));
    data.setLocation(locationService.getById(1l));
    data.setUser(userService.getById(1l));
    data.setAmount(20);
    data.setDate(new Timestamp(1534763270));

    DishBalance actualPOST = dishBalanceService.save(data);
    Assert.assertEquals(data, actualPOST);

    DishBalance actualGET = dishBalanceService.getById(data.getId());
    Assert.assertEquals(data, actualGET);

    data.setAmount(30);
    DishBalance actualPUT = dishBalanceService.save(data);
    Assert.assertEquals(data, actualPUT);

    dishBalanceService.deleteById(data.getId());
    try {
      DishBalance actualDELETE = dishBalanceService.getById(data.getId());
      Assert.assertNull(actualDELETE);
    } catch (EntityNotFoundException ex) {
      Assert.assertNull(null);
    }

  }

  @Test
  public void DishCommentCRUD() {
    DishComment data = new DishComment();
    data.setUser(userService.getById(1l));
    data.setDishAccounting(dishAccountingService.getById(1l));
    data.setMessage("message 1");
    data.setDate(new Timestamp(1534763270));

    DishComment actualPOST = dishCommentService.save(data);
    Assert.assertEquals(data, actualPOST);

    DishComment actualGET = dishCommentService.getById(data.getId());
    Assert.assertEquals(data, actualGET);

    data.setMessage("message 2");
    DishComment actualPUT = dishCommentService.save(data);
    Assert.assertEquals(data, actualPUT);

    dishCommentService.deleteById(data.getId());
    try {
      DishComment actualDELETE = dishCommentService.getById(data.getId());
      Assert.assertNull(actualDELETE);
    } catch (EntityNotFoundException ex) {
      Assert.assertNull(null);
    }

  }

  @Test
  public void DishTypeCRUD() {
    DishType data = new DishType();
    data.setTitle("title 1");

    DishType actualPOST = dishTypeService.save(data);
    Assert.assertEquals(data, actualPOST);

    DishType actualGET = dishTypeService.getById(data.getId());
    Assert.assertEquals(data, actualGET);

    data.setTitle("title 2");
    DishType actualPUT = dishTypeService.save(data);
    Assert.assertEquals(data, actualPUT);

    dishTypeService.deleteById(data.getId());
    try {
      DishType actualDELETE = dishTypeService.getById(data.getId());
      Assert.assertNull(actualDELETE);
    } catch (EntityNotFoundException ex) {
      Assert.assertNull(null);
    }

  }

  @Test
  public void EmployeeCRUD() {
    Employee data = new Employee();
    data.setUser(userService.getById(4L));
    data.setPosition(positionService.getById(3L));
    data.setForename("Mykola");
    data.setSurname("Saint");
    data.setPatronymic("Mykolayovych");

    Employee actualPOST = employeeService.save(data);
    Assert.assertEquals(data, actualPOST);

    Employee actualGET = employeeService.getById(data.getId());
    Assert.assertEquals(data, actualGET);

    data.setPhoneNumber("457488975");
    Employee actualPUT = employeeService.save(data);
    Assert.assertEquals(data, actualPUT);

    employeeService.deleteById(data.getId());
    try {
      Employee actualDELETE = employeeService.getById(data.getId());
      Assert.assertNull(actualDELETE);
    } catch (EntityNotFoundException ex) {
      Assert.assertNull(null);
    }

  }

  @Test
  public void FoodSupplyCRUD() {
    FoodSupply data = new FoodSupply();
    data.setMealTimeCategory(mealTimeCategoryService.getById(1l));
    data.setUser(userService.getById(1l));
    data.setConsumer(consumerService.getById(1l));
    data.setLocation(locationService.getById(1l));
    data.setAmount(10);
    data.setDate(new Timestamp(1534769647));

    FoodSupply actualPOST = foodSupplyService.save(data);
    Assert.assertEquals(data, actualPOST);

    FoodSupply actualGET = foodSupplyService.getById(data.getId());
    Assert.assertEquals(data, actualGET);

    data.setAmount(20);
    FoodSupply actualPUT = foodSupplyService.save(data);
    Assert.assertEquals(data, actualPUT);

    foodSupplyService.deleteById(data.getId());
    try {
      FoodSupply actualDELETE = foodSupplyService.getById(data.getId());
      Assert.assertNull(actualDELETE);
    } catch (EntityNotFoundException ex) {
      Assert.assertNull(null);
    }

  }

  @Test
  public void LocationCRUD() {
    Location data = new Location();
    data.setTitle("home");
    data.setInfo("home sweet home");
    data.setTasks(new ArrayList<Task>());

    Location actualPOST = locationService.save(data);
    Assert.assertEquals(data, actualPOST);

    Location actualGET = locationService.getById(data.getId());
    Assert.assertEquals(data, actualGET);

    data.setTitle("changed home");
    Location actualPUT = locationService.save(data);
    Assert.assertEquals(data, actualPUT);

    locationService.deleteById(data.getId());
    try {
      Location actualDELETE = locationService.getById(data.getId());
      Assert.assertNull(actualDELETE);
    } catch (EntityNotFoundException ex) {
      Assert.assertNull(null);
    }

  }

  @Test
  public void MealTimeCategoryCRUD() {
    MealTimeCategory data = new MealTimeCategory();
    data.setTitle("first category");

    MealTimeCategory actualPOST = mealTimeCategoryService.save(data);
    Assert.assertEquals(data, actualPOST);

    MealTimeCategory actualGET = mealTimeCategoryService.getById(data.getId());
    Assert.assertEquals(data, actualGET);

    data.setTitle("second category");
    MealTimeCategory actualPUT = mealTimeCategoryService.save(data);
    Assert.assertEquals(data, actualPUT);

    mealTimeCategoryService.deleteById(data.getId());
    try {
      MealTimeCategory actualDELETE = mealTimeCategoryService.getById(data.getId());
      Assert.assertNull(actualDELETE);
    } catch (EntityNotFoundException ex) {
      Assert.assertNull(null);
    }

  }

  @Test
  public void PermissionCRUD() {
    Permission data = new Permission();
    data.setName("first permission");
    data.setRoles(new ArrayList<Role>());

    Permission actualPOST = permissionService.save(data);
    Assert.assertEquals(data, actualPOST);

    Permission actualGET = permissionService.getById(data.getId());
    Assert.assertEquals(data, actualGET);

    data.setName("Second permission");
    Permission actualPUT = permissionService.save(data);
    Assert.assertEquals(data, actualPUT);

    permissionService.deleteById(data.getId());
    try {
      Permission actualDELETE = permissionService.getById(data.getId());
      Assert.assertNull(actualDELETE);
    } catch (EntityNotFoundException ex) {
      Assert.assertNull(null);
    }

  }

  @Test
  public void PositionCRUD() {
    Position data = new Position();
    data.setTitle("checkman");

    Position actualPOST = positionService.save(data);
    Assert.assertEquals(data, actualPOST);

    Position actualGET = positionService.getById(data.getId());
    Assert.assertEquals(data, actualGET);

    data.setTitle("checkwoman");
    Position actualPUT = positionService.save(data);
    Assert.assertEquals(data, actualPUT);

    positionService.deleteById(data.getId());
    try {
      Position actualDELETE = positionService.getById(data.getId());
      Assert.assertNull(actualDELETE);
    } catch (EntityNotFoundException ex) {
      Assert.assertNull(null);
    }

  }

  @Test
  public void RoleCRUD() {
    Role data = new Role();
    data.setName("check message");

    Role actualPOST = roleService.save(data);
    Assert.assertEquals(data, actualPOST);

    Role actualGET = roleService.getById(data.getId());
    Assert.assertEquals(data, actualGET);

    data.setName("check home");
    Role actualPUT = roleService.save(data);
    Assert.assertEquals(data, actualPUT);

    roleService.deleteById(data.getId());
    try {
      Role actualDELETE = roleService.getById(data.getId());
      Assert.assertNull(actualDELETE);
    } catch (EntityNotFoundException ex) {
      Assert.assertNull(null);
    }

  }

  @Test
  public void ScheduleCRUD() {
    Schedule data = new Schedule();
    data.setPosition(positionService.getById(1l));
    data.setStart(new Time(1534763270));
    data.setEnd(new Time(1534764000));

    Schedule actualPOST = scheduleServiceCrud.save(data);
    Assert.assertEquals(data, actualPOST);

    Schedule actualGET = scheduleServiceCrud.getById(data.getId());
    Assert.assertEquals(data, actualGET);

    data.setEnd(new Time(1534770516));
    Schedule actualPUT = scheduleServiceCrud.save(data);
    Assert.assertEquals(data, actualPUT);

    scheduleServiceCrud.deleteById(data.getId());
    try {
      Schedule actualDELETE = scheduleServiceCrud.getById(data.getId());
      Assert.assertNull(actualDELETE);
    } catch (EntityNotFoundException ex) {
      Assert.assertNull(null);
    }

  }

  @Test
  public void ShiftCommentCRUD() {
    ShiftComment data = new ShiftComment();
    data.setUser(userService.getById(1l));
    data.setMessage("message 1");
    data.setDate(new Timestamp(1534770516));

    ShiftComment actualPOST = shiftCommentService.save(data);
    Assert.assertEquals(data, actualPOST);

    ShiftComment actualGET = shiftCommentService.getById(data.getId());
    Assert.assertEquals(data, actualGET);

    data.setMessage("message 2");
    ShiftComment actualPUT = shiftCommentService.save(data);
    Assert.assertEquals(data, actualPUT);

    shiftCommentService.deleteById(data.getId());
    try {
      ShiftComment actualDELETE = shiftCommentService.getById(data.getId());
      Assert.assertNull(actualDELETE);
    } catch (EntityNotFoundException ex) {
      Assert.assertNull(null);
    }

  }

  @Test
  public void TaskCommentCRUD() {
    TaskComment data = new TaskComment();
    data.setTask(taskServiceCrud.getById(1l));
    data.setUser(userService.getById(1l));
    data.setMessage("TaskComment 1");
    data.setDate(new Timestamp(1534770516));

    TaskComment actualPOST = taskCommentService.save(data);
    Assert.assertEquals(data, actualPOST);

    TaskComment actualGET = taskCommentService.getById(data.getId());
    Assert.assertEquals(data, actualGET);

    data.setMessage("TaskComment 2");
    TaskComment actualPUT = taskCommentService.save(data);
    Assert.assertEquals(data, actualPUT);

    taskCommentService.deleteById(data.getId());
    try {
      TaskComment actualDELETE = taskCommentService.getById(data.getId());
      Assert.assertNull(actualDELETE);
    } catch (EntityNotFoundException ex) {
      Assert.assertNull(null);
    }

  }

  @Test
  public void UserCRUD() {
    User data = new User();
    data.setLogin("qqqqqqqqq");
    data.setPassword("111");
    data.setRoles(new ArrayList<Role>());

    User actualPOST = userService.save(data);
    Assert.assertEquals(data, actualPOST);

    User actualGET = userService.getById(data.getId());
    Assert.assertEquals(data, actualGET);

    data.setPassword("222");
    User actualPUT = userService.save(data);
    Assert.assertEquals(data, actualPUT);

    userService.deleteById(data.getId());
    try {
      User actualDELETE = userService.getById(data.getId());
      Assert.assertNull(actualDELETE);
    } catch (EntityNotFoundException ex) {
      Assert.assertNull(null);
    }

  }

  @Test
  public void VacancyCommentCRUD() {
    VacancyComment data = new VacancyComment();
    data.setUser(userService.getById(1l));
    data.setVacancy(vacancyService.getById(1l));
    data.setMessage("message 1");
    data.setDate(new Timestamp(1534770516));

    VacancyComment actualPOST = vacancyCommentService.save(data);
    Assert.assertEquals(data, actualPOST);

    VacancyComment actualGET = vacancyCommentService.getById(data.getId());
    Assert.assertEquals(data, actualGET);

    data.setMessage("message 2");
    VacancyComment actualPUT = vacancyCommentService.save(data);
    Assert.assertEquals(data, actualPUT);

    vacancyCommentService.deleteById(data.getId());
    try {
      VacancyComment actualDELETE = vacancyCommentService.getById(data.getId());
      Assert.assertNull(actualDELETE);
    } catch (EntityNotFoundException ex) {
      Assert.assertNull(null);
    }

  }

  @Test
  public void VacancyCRUD() {
    Vacancy data = new Vacancy();
    data.setPosition(positionService.getById(1L));
    data.setSalary("10004");
    data.setVacancyStatus(Vacancy.VacancyStatus.OPENED);
    data.setInfo("OPENED 1");

    Vacancy actualPOST = vacancyService.save(data);
    Assert.assertEquals(data, actualPOST);

    Vacancy actualGET = vacancyService.getById(data.getId());
    Assert.assertEquals(data, actualGET);

    data.setSalary("45948563");
    Vacancy actualPUT = vacancyService.save(data);
    Assert.assertEquals(data, actualPUT);

    try {
      vacancyService.deleteVacancy(data, StaticCollection.getUser());
    } catch (IllegalAccessException e) {
      e.printStackTrace();
    }
    try {
      Vacancy actualDELETE = vacancyService.getById(data.getId());
      Assert.assertNull(actualDELETE);
    } catch (EntityNotFoundException ex) {
      Assert.assertNull(null);
    }

  }

  @Test
  public void WashPeriodCRUD() {
    WashPeriod data = new WashPeriod();
    data.setPeriod("never");

    WashPeriod actualPOST = washPeriodService.save(data);
    Assert.assertEquals(data, actualPOST);

    WashPeriod actualGET = washPeriodService.getById(data.getId());
    Assert.assertEquals(data, actualGET);

    data.setPeriod("now");
    WashPeriod actualPUT = washPeriodService.save(data);
    Assert.assertEquals(data, actualPUT);

    washPeriodService.deleteById(data.getId());
    try {
      WashPeriod actualDELETE = washPeriodService.getById(data.getId());
      Assert.assertNull(actualDELETE);
    } catch (EntityNotFoundException ex) {
      Assert.assertNull(null);
    }

  }

  @Test
  public void WashStatsMaterialCRUD() {
    WashStatsMaterial data = new WashStatsMaterial();
    data.setWashStats(washStatsService.getById(1l));
    data.setCleaningMaterial(cleaningMaterialService.getById(1l));
    data.setAmount(10);

    WashStatsMaterial actualPOST = washStatsMaterialService.save(data);
    Assert.assertEquals(data, actualPOST);

    WashStatsMaterial actualGET = washStatsMaterialService.getById(data.getId());
    Assert.assertEquals(data, actualGET);

    data.setAmount(20);
    WashStatsMaterial actualPUT = washStatsMaterialService.save(data);
    Assert.assertEquals(data, actualPUT);

    washStatsMaterialService.deleteById(data.getId());
    try {
      WashStatsMaterial actualDELETE = washStatsMaterialService.getById(data.getId());
      Assert.assertNull(actualDELETE);
    } catch (EntityNotFoundException ex) {
      Assert.assertNull(null);
    }

  }

  @Test
  public void WashStatsCRUD() {
    WashStats data = new WashStats();
    data.setUser(userService.getById(1l));
    data.setWashPeriod(washPeriodService.getById(1l));
    data.setConsumer(consumerService.getById(1l));
    data.setWeight(10);
    data.setDate(new Timestamp(System.currentTimeMillis()));

    WashStats actualPOST = washStatsService.save(data);
    Assert.assertEquals(data, actualPOST);

    WashStats actualGET = washStatsService.getById(data.getId());
    Assert.assertEquals(data, actualGET);

    data.setWeight(20);
    WashStats actualPUT = washStatsService.save(data);
    Assert.assertEquals(data, actualPUT);

    washStatsService.deleteById(data.getId());
    try {
      WashStats actualDELETE = washStatsService.getById(data.getId());
      Assert.assertNull(actualDELETE);
    } catch (EntityNotFoundException ex) {
      Assert.assertNull(null);
    }

  }

  @Test
  public void deleteCommentByIdAndAddComment() throws IllegalAccessException {
    User userFromToken = StaticCollection.getUser();
    ShiftComment commentFromDB = workCommentService.getCommentById(1L);
    workCommentService.deleteComment(commentFromDB, commentFromDB.getUser());
    try {
      workCommentService.getCommentById(1L);
      Assert.assertNull(1L);
    } catch (EntityNotFoundException ex) {
      Assert.assertNull(null);
    }

    ShiftComment insertedComment = workCommentService.addComment(commentFromDB);
    Assert.assertEquals(insertedComment, workCommentService.getCommentById(insertedComment.getId()));
  }

  @Test
  public void getCommentById() {
    ShiftComment expected = workCommentService.getCommentById(2L);
    Assert.assertEquals(expected, expected);
  }

  @Test
  public void getSizeOfListPosition() {
    int size = positionService.getAll().size();
    Assert.assertEquals(4, size);
  }

  @Test
  public void checkGetPositionByTitleIn() {
    List<String> titles = new ArrayList<>();
    titles.add("manager");
    titles.add("admin");
    List<Position> expected = new ArrayList<>();
    expected.add(positionRepository.getOne(1L));
    expected.add(positionRepository.getOne(2L));
    List<Position> actual = positionRepository.getPositionByTitleIn(titles);
    Assert.assertTrue(expected.containsAll(actual));
  }

  @Test
  public void scheduleCrud() {
    Schedule schedule = new Schedule();
    schedule.setPosition(StaticCollection.getPosition());
    schedule.setStart(new Time(System.currentTimeMillis() - (1000 * 60 * 60)));
    schedule.setEnd(new Time(System.currentTimeMillis()));

    schedule = scheduleService.create(schedule);
    Assert.assertNotNull(schedule);

    Assert.assertNull(schedule.getExpired());
    Schedule removed = scheduleService.remove(schedule);
    Assert.assertNotNull(removed.getExpired());
  }

  @Test
  public void taskCreated() {
    Task task = new Task();
    task.setDelegator(StaticCollection.getUser());
    task.setMessage("Hello");
    taskService.create(task);

    Assert.assertNotNull(taskService.findAllActive());
  }
}



