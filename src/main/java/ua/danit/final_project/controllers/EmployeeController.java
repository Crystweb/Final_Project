package ua.danit.final_project.controllers;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import ua.danit.final_project.entities.Employee;
import ua.danit.final_project.services.EmployeeService;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/employee")
public class EmployeeController {

  private final EmployeeService employeeService;


  public EmployeeController(EmployeeService employeeService) {
    this.employeeService = employeeService;
  }

  @GetMapping
  public List<Employee> getAllEmployee() {
    return employeeService.getAll();
  }

  @PostMapping
  public Employee addEmployee(@RequestParam("uid") Long uid,
                              @RequestParam("forename") String forename,
                              @RequestParam("surname") String surname,
                              @RequestParam("patronymic") String patronymic,
                              @RequestParam("telephone") String telephone,
                              @RequestParam("position") String position) {
    return employeeService.addEmployee(uid, forename, surname, patronymic, telephone, position);
  }



}
