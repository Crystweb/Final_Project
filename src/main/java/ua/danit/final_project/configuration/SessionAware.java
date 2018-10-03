package ua.danit.final_project.configuration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import ua.danit.final_project.entities.Employee;
import ua.danit.final_project.entities.Position;
import ua.danit.final_project.entities.User;
import ua.danit.final_project.repositories.UserRepository;

@Component
public abstract class SessionAware {

  @Autowired
  private UserRepository userRepository;

  protected User getCurrentUser() {
    return userRepository.getOne(5L);
  }

  protected Employee getEmployee() {
    return getCurrentUser().getEmployee();
  }

  protected Position getPosition() {
    return getEmployee().getPosition();
  }
}
