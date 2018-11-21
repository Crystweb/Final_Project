package ua.danit.final_project.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import ua.danit.final_project.controllers.exceptions.UserAlreadyExistsException;
import ua.danit.final_project.entities.User;
import ua.danit.final_project.repositories.UserRepository;

@Service
public class RegistrationServiceImpl implements RegistrationService {

  private final PasswordEncoder passwordEncoder;
  private final UserRepository userRepository;

  @Autowired
  public RegistrationServiceImpl(PasswordEncoder passwordEncoder,
                                 UserRepository userRepository) {
    this.passwordEncoder = passwordEncoder;
    this.userRepository = userRepository;
  }

  @Override
  public void register(User user) throws UserAlreadyExistsException {
    final String pwd = passwordEncoder.encode(user.getPassword());
    user.setPassword(pwd);

    try {
      userRepository.save(user);
    } catch (DataIntegrityViolationException exception) {
      throw new UserAlreadyExistsException();
    }
  }
}
