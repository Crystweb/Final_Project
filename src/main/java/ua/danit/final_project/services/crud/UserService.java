package ua.danit.final_project.services.crud;

import ua.danit.final_project.entities.User;

import java.util.List;

public interface UserService {
  User getById(Long id);

  List<User> getAll();

  User save(User user);

  void deleteById(Long id);
}
