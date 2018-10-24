package ua.danit.final_project.configuration.security;

import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.DefaultRedirectStrategy;
import org.springframework.security.web.RedirectStrategy;
import org.springframework.security.web.authentication.SavedRequestAwareAuthenticationSuccessHandler;
import org.springframework.security.web.savedrequest.DefaultSavedRequest;
import org.springframework.stereotype.Component;
import ua.danit.final_project.entities.User;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.Set;

@Component
public class CustomAuthenticationSuccessHandler extends SavedRequestAwareAuthenticationSuccessHandler {

  @Getter
  @Setter
  private RedirectStrategy redirectStrategy = new DefaultRedirectStrategy();

  @Override
  public void onAuthenticationSuccess(HttpServletRequest request,
                                      HttpServletResponse response, Authentication authentication) throws IOException {
    HttpSession session = request.getSession();

    if (session != null) {
      session.setMaxInactiveInterval(43200);
    }

    /*Set some session variables*/
    User authUser = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    assert session != null;
    session.setAttribute("login", authUser.getLogin());
    session.setAttribute("authorities", authentication.getAuthorities());

    DefaultSavedRequest url = (DefaultSavedRequest) session.getAttribute("SPRING_SECURITY_SAVED_REQUEST");

    String link = url.getRequestURI();

    if (url.getQueryString() != null) {

      link += "?" + url.getQueryString();

    }

    /*Set target URL to redirect*/
    String targetUrl = determineTargetUrl(authentication, link);

    redirectStrategy.sendRedirect(request, response, targetUrl);
  }

  protected String determineTargetUrl(Authentication authentication, String url) {
    Set<String> authorities = AuthorityUtils.authorityListToSet(authentication.getAuthorities());
    if (authorities.contains("ROLE_ADMIN") || authorities.contains("ROLE_MODERATOR")) {
      return "/admin";
    } else if (authorities.contains("ROLE_CLIENT")) {
      return url;
    } else {
      throw new IllegalStateException();
    }
  }
}
