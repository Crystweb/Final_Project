package ua.danit.final_project.services.crud;

import ua.danit.final_project.entities.Employee;
import ua.danit.final_project.entities.Position;

import java.util.List;

public interface EmployeeService {

  Employee getById(Long id);

  List<Employee> getAll();

  Employee save(Employee employee);

  void deleteById(Long id);

  Position getPositionByTitle(String title);
}
