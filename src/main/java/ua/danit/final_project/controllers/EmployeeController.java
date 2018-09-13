package ua.danit.final_project.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ua.danit.final_project.configuration.StaticCollection;
import ua.danit.final_project.dto.EmployeeDto;
import ua.danit.final_project.entities.User;
import ua.danit.final_project.entities.Employee;
import ua.danit.final_project.services.crud.EmployeeService;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/employee")
public class EmployeeController {

    private final EmployeeService employeeService;
    private final User user = StaticCollection.getUser();

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
    public Employee createEmployee(@RequestBody Employee employee) {
        employee.setUser(user);
        return employeeService.save(employee);
    }

//    @DeleteMapping("/employee/{id}")
//    public ResponseEntity<?> delete(@PathVariable("id") Long id) {
//        employeeService.delete(id);
//        return ResponseEntity.ok().body("Book has been deleted successfully.");
//    }
}
