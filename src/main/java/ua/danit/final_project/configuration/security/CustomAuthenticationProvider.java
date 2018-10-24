package ua.danit.final_project.configuration.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.stereotype.Component;
import ua.danit.final_project.entities.User;
import ua.danit.final_project.repositories.UserRepository;

@Component
public class CustomAuthenticationProvider extends DaoAuthenticationProvider {

  private final UserRepository userRepository;

  @Autowired
  public CustomAuthenticationProvider(UserRepository userRepository) {
    this.userRepository = userRepository;
  }

  @Override
  public Authentication authenticate(Authentication auth)
      throws AuthenticationException {

    User user = userRepository.findByLogin(auth.getName())
        .orElseThrow(() -> new BadCredentialsException("Invalid username or password"));

    Authentication result = super.authenticate(auth);

    return new UsernamePasswordAuthenticationToken(
        user, result.getCredentials(), result.getAuthorities());
  }

  @Override
  public boolean supports(Class<?> authentication) {
    return authentication.equals(UsernamePasswordAuthenticationToken.class);
  }


  /*
   * Original method throws exception.
   * */
  @Override
  protected void doAfterPropertiesSet() {
    if (super.getUserDetailsService() != null) {
      logger.warn("Prevent error on configuring security.");
    }
  }
}
