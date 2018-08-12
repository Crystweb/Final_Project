package ua.danit.final_project.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ua.danit.final_project.entities.Employee;
import ua.danit.final_project.entities.User;
import ua.danit.final_project.repositories.EmployeeRepo;
import ua.danit.final_project.repositories.UserRepo;

import javax.persistence.EntityNotFoundException;
import java.util.List;

@Service
public class EmployeeServiceImpl implements EmployeeService {
  private final EmployeeRepo employeeRepo;
  private final UserRepo userRepo;

  @Autowired
  public EmployeeServiceImpl(EmployeeRepo employeeRepo, UserRepo userRepo) {
    this.employeeRepo = employeeRepo;
    this.userRepo = userRepo;
  }


  @Override
  public Employee addEmployee(Long uid,
                              String forename,
                              String surname,
                              String patronymic,
                              String telephone,
                              String position) {
    User user = userRepo.findById(uid).orElseThrow(EntityNotFoundException::new);

    Employee employee = new Employee();
    employee.setUser(user);
    employee.setForename(forename);
    employee.setSurname(surname);
    employee.setPatronymic(patronymic);
    employee.setTelephone(telephone);
    employee.setPosition(position);
    return employeeRepo.save(employee);
  }

  @Override
  public List<Employee> getAll() {
    return employeeRepo.findAll();
  }
}
