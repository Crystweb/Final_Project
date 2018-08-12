package ua.danit.final_project.services;


import ua.danit.final_project.entities.Employee;
import ua.danit.final_project.entities.User;

import java.util.List;

public interface EmployeeService {
  Employee addEmployee(Long uid, String forename, String surname, String patronymic);

  List<Employee> getAll();
}
