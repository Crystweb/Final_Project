package ua.danit.final_project.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ua.danit.final_project.entities.Employee;
import ua.danit.final_project.entities.Position;
import ua.danit.final_project.entities.User;
import ua.danit.final_project.repositories.EmployeeRepo;
import ua.danit.final_project.repositories.PositionRepo;
import ua.danit.final_project.repositories.UserRepo;

import javax.persistence.EntityNotFoundException;
import java.util.List;

@Service
public class EmployeeServiceImpl implements EmployeeService {
  private final EmployeeRepo employeeRepo;
  private final UserRepo userRepo;
  private final PositionRepo positionRepo;

  @Autowired
  public EmployeeServiceImpl(EmployeeRepo employeeRepo, UserRepo userRepo, PositionRepo positionRepo) {
    this.employeeRepo = employeeRepo;
    this.userRepo = userRepo;
    this.positionRepo = positionRepo;
  }


  @Override
  public Employee addEmployee(Long uid,
                              Long pid,
                              String forename,
                              String surname,
                              String patronymic,
                              String phoneNumber,
                              String info) {
    User user = userRepo.findById(uid).orElseThrow(EntityNotFoundException::new);
    Position position =  positionRepo.findById(pid).orElseThrow(EntityNotFoundException::new);
    Employee employee = new Employee();
    employee.setUser(user);
    employee.setPosition(position);
    employee.setForename(forename);
    employee.setSurname(surname);
    employee.setPatronymic(patronymic);
    employee.setPhoneNumber(phoneNumber);
    employee.setInfo(info);
    return employeeRepo.save(employee);
  }

  @Override
  public List<Employee> getAll() {
    return employeeRepo.findAll();
  }
}
