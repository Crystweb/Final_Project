package ua.danit.final_project.configuration.security;

import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.LockedException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

import static java.lang.String.format;

@Component
public class CustomAuthenticationFailureHandler extends SimpleUrlAuthenticationFailureHandler {

  public CustomAuthenticationFailureHandler() {
  }

  public CustomAuthenticationFailureHandler(String defaultFailureUrl) {
    this.setDefaultFailureUrl(defaultFailureUrl);
  }

  @Override
  public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response,
                                      AuthenticationException exception) throws IOException {

    if (exception.getClass().isAssignableFrom(BadCredentialsException.class)) {
      getRedirectStrategy().sendRedirect(
          request, response, format("/login/?badCredential=%s", exception.getMessage())
      );

    } else if (exception.getClass().isAssignableFrom(DisabledException.class)) {
      getRedirectStrategy().sendRedirect(
          request, response, format("/login/?disabledUser=%s", request.getParameter("phone"))
      );

    } else if (exception.getClass().isAssignableFrom(LockedException.class)) {
      getRedirectStrategy().sendRedirect(request, response, "/login/?lockedUser");
    }
  }
}