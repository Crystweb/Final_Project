package ua.danit.final_project.services.crud;


import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import ua.danit.final_project.entities.Employee;

import java.util.List;

public interface EmployeeService {

  Employee getById(Long id);

  List<Employee> getAll();

  Employee save(Employee employee);
//  @Transactional(propagation = Propagation.REQUIRED)
//   void deleteEmployee(Long id) {
//    employeeDao.deleteEmployee(id);
//  }
}
