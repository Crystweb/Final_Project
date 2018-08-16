package ua.danit.final_project.services;


import ua.danit.final_project.entities.Employee;


import java.util.List;

public interface EmployeeService {
  Employee addEmployee(Long uid,
                       Long pid,
                       String forename,
                       String surname,
                       String patronymic,
                       String phoneNumber,
                       String info);


  List<Employee> getAll();
}
