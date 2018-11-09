package ua.danit.final_project.configuration;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import ua.danit.final_project.entities.Employee;
import ua.danit.final_project.entities.Position;
import ua.danit.final_project.entities.User;

@Component
public abstract class SessionAware {

  protected User getCurrentUser() {
    return (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
  }

  protected Employee getEmployee() {
    return getCurrentUser().getEmployee();
  }

  protected Position getPosition() {
    return getEmployee().getPosition();
  }
}
