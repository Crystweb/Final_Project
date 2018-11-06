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
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import ua.danit.final_project.configuration.SessionAware;
import ua.danit.final_project.dto.EmployeeDto;
import ua.danit.final_project.entities.Employee;
import ua.danit.final_project.services.crud.EmployeeService;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/employee")
public class EmployeeController extends SessionAware {

  private final EmployeeService employeeService;

  @Autowired
  public EmployeeController(EmployeeService employeeService) {
    this.employeeService = employeeService;
  }

  @GetMapping
  public List<EmployeeDto> getEmployeeDto() {
    return employeeService.getAll();
  }

  @PostMapping
  public EmployeeDto createEmployee(@RequestBody EmployeeDto employee) {
    return employeeService.save(employee);
  }

  @PostMapping("/{id}")
  public String addImage(@RequestPart("file") MultipartFile file,
                         @PathVariable("id") Employee employee) throws IOException {
    final EmployeeDto employeeDto = employeeService.addImage(employee, file);
    return employeeDto.getImage();
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
