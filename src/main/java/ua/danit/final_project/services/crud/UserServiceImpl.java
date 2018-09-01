package ua.danit.final_project.services.crud;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ua.danit.final_project.entities.User;
import ua.danit.final_project.repositories.UserRepository;

import javax.persistence.EntityNotFoundException;
import java.util.List;

@Service
public class UserServiceImpl implements UserService {

  private final UserRepository userRepository;

  @Autowired
  public UserServiceImpl(UserRepository userRepository) {
    this.userRepository = userRepository;
  }


  @Override
  public User getById(Long id) {
    return userRepository.findById(id).orElseThrow(EntityNotFoundException::new);
  }

  @Override
  public List<User> getAll() {
    return userRepository.findAll();
  }

  @Override
  public User save(User user) {
    return userRepository.save(user);
  }

  @Override
  public void deleteById(Long id) {
    userRepository.deleteById(id);
  }
}
