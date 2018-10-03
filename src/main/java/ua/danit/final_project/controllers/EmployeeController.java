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
import ua.danit.final_project.dto.DefaultMapper;
import ua.danit.final_project.dto.EmployeeDto;
import ua.danit.final_project.entities.Employee;
import ua.danit.final_project.services.crud.EmployeeService;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/employee")
public class EmployeeController {

  private final EmployeeService employeeService;
  private final DefaultMapper mapper;

  @Autowired
  public EmployeeController(EmployeeService employeeService,
                            DefaultMapper mapper) {
    this.employeeService = employeeService;
    this.mapper = mapper;
  }

  @GetMapping
  public List<EmployeeDto> getEmployeeDto() {
    return employeeService.getAll()
            .stream()
            .map(mapper::employeeToEmployeeDto)
            .collect(Collectors.toList());
  }

  @PostMapping
  public EmployeeDto createEmployee(@RequestBody EmployeeDto employeeDto) {
    Employee employee = mapper.employeeDtoToEmployee(employeeDto);

    return mapper.employeeToEmployeeDto(employee);
  }

  @PutMapping
  public EmployeeDto updateEmployee(@RequestBody EmployeeDto employeeDto) {
    return createEmployee(employeeDto);
  }

  @DeleteMapping("/{id}")
  public ResponseEntity deleteEmployee(@PathVariable("id") Long id) {
    employeeService.deleteById(id);
    return ResponseEntity.ok().body("Employee #" + id + " successfully removed.");
  }
}
