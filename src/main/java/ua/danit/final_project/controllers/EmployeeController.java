package ua.danit.final_project.controllers;

import org.springframework.web.bind.annotation.*;
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
  public Employee addEmployee(@RequestBody Employee employee) {
    return employeeService.addEmployee(employee);
  }



}
