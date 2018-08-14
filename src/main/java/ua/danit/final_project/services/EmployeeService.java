package ua.danit.final_project.services;


import ua.danit.final_project.entities.Employee;


import java.util.List;

public interface EmployeeService {
  Employee addEmployee(Long uid,
                       String forename,
                       String surname,
                       String patronymic,
                       String telephone,
                       String position);

  List<Employee> getAll();
}
