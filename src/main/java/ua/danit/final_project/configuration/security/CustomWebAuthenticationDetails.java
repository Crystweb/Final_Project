package ua.danit.final_project.configuration.security;

import lombok.Getter;
import lombok.Setter;
import org.springframework.security.web.authentication.WebAuthenticationDetails;

import javax.servlet.http.HttpServletRequest;

public class CustomWebAuthenticationDetails extends WebAuthenticationDetails {

  @Getter
  @Setter
  private String verificationCode;

  public CustomWebAuthenticationDetails(HttpServletRequest request) {
    super(request);
    verificationCode = request.getParameter("password");
  }
}
