package ua.danit.final_project.configuration.security;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ua.danit.final_project.entities.User;
import ua.danit.final_project.repositories.UserRepository;


@Service("customUserDetailsService")
public class CustomUserDetailsService implements UserDetailsService {

  private final Logger logger = LoggerFactory.getLogger(CustomUserDetailsService.class);

  private final UserRepository userRepository;

  @Autowired
  public CustomUserDetailsService(UserRepository userRepository) {
    this.userRepository = userRepository;
  }

  @Transactional(readOnly = true)
  public UserDetails loadUserByUsername(String login)
      throws UsernameNotFoundException {
    User user = userRepository.findByLogin(login)
        .orElseThrow(() -> new UsernameNotFoundException("Username not found"));

    logger.info("User " + user.getLogin() + " success.");

    return user;
  }

}
