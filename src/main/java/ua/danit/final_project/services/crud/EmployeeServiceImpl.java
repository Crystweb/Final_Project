package ua.danit.final_project.services.crud;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ua.danit.final_project.dto.EmployeeDto;
import ua.danit.final_project.entities.Employee;
import ua.danit.final_project.entities.Position;
import ua.danit.final_project.entities.User;
import ua.danit.final_project.repositories.EmployeeRepository;
import ua.danit.final_project.repositories.PositionRepository;
import ua.danit.final_project.repositories.UserRepository;

import javax.persistence.EntityNotFoundException;
import java.util.List;

@Service
public class EmployeeServiceImpl implements EmployeeService {

  private final EmployeeRepository employeeRepository;
  private final PositionRepository positionRepository;
  private final UserRepository userRepository;

  @Autowired
  public EmployeeServiceImpl(EmployeeRepository employeeRepository,
                             PositionRepository positionRepository,
                             UserRepository userRepository) {
    this.employeeRepository = employeeRepository;
    this.positionRepository = positionRepository;
    this.userRepository = userRepository;
  }

  @Override
  public Employee getById(Long id) {
    return employeeRepository.findById(id).orElseThrow(EntityNotFoundException::new);
  }

  @Override
  public List<Employee> getAll() {
    return employeeRepository.findAll();
  }

  @Override
  public Employee save(Employee employee) {
    return employeeRepository.save(employee);
  }

  @Override
  public void deleteById(Long id) {
    employeeRepository.deleteById(id);
  }

  @Override
  public Position getPositionByTitle(String title) {
    return positionRepository.getPositionByTitle(title);
  }

  @Override
  public User addUserIfExists(EmployeeDto employeeDto) {
    if (employeeDto.getUserId() != null) {
      return userRepository.getOne(employeeDto.getUserId());
    } else {
      return null;
    }
  }
}
