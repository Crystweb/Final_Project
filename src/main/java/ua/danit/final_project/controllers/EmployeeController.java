package ua.danit.final_project.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ua.danit.final_project.dto.EmployeeDto;
import ua.danit.final_project.entities.Employee;
import ua.danit.final_project.services.crud.EmployeeService;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/employee")
public class EmployeeController {

  private final EmployeeService employeeService;

  @Autowired
  public EmployeeController(EmployeeService employeeService) {
    this.employeeService = employeeService;
  }

  @GetMapping
  public List<EmployeeDto> getEmployeeDto() {
    return employeeService.getAll()
            .stream()
            .map(EmployeeDto::new)
            .collect(Collectors.toList());
  }

  @PostMapping
  public ResponseEntity<Employee> createEmployee(@RequestBody EmployeeDto employeeDto) {
    Employee employee = new Employee();

    employee.setUser(employeeService.addUserIfExists(employeeDto));
    employee.setForename(employeeDto.getForename());
    employee.setPatronymic(employeeDto.getPatronymic());
    employee.setPhoneNumber(employeeDto.getPhoneNumber());
    employee.setSurname(employeeDto.getSurname());
    employee.setPosition(employeeService.getPositionByTitle(employeeDto.getPosition()));
    employee.setInfo(employeeDto.getInfo());

    return ResponseEntity.ok().body(employeeService.save(employee));
  }

  @PutMapping
  public ResponseEntity<Employee> updateEmployee(@RequestBody EmployeeDto employeeDto) {
    Employee employee = new Employee();

    employee.setId(employeeDto.getId());
    employee.setUser(employeeService.addUserIfExists(employeeDto));
    employee.setForename(employeeDto.getForename());
    employee.setPatronymic(employeeDto.getPatronymic());
    employee.setPhoneNumber(employeeDto.getPhoneNumber());
    employee.setSurname(employeeDto.getSurname());
    employee.setPosition(employeeService.getPositionByTitle(employeeDto.getPosition()));
    employee.setInfo(employeeDto.getInfo());

    return ResponseEntity.ok().body(employeeService.save(employee));
  }

  @DeleteMapping("/{id}")
  public ResponseEntity deleteEmployee(@PathVariable("id") Long id) {
    employeeService.deleteById(id);
    return ResponseEntity.ok().body("Book has been deleted successfully.");
  }
}
