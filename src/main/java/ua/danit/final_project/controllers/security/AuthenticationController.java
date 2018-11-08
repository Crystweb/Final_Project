package ua.danit.final_project.controllers.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import ua.danit.final_project.configuration.security.JwtAuthenticationRequest;
import ua.danit.final_project.configuration.security.JwtAuthenticationResponse;
import ua.danit.final_project.configuration.security.JwtTokenUtil;
import ua.danit.final_project.controllers.exceptions.AuthenticationException;
import ua.danit.final_project.dto.DefaultMapper;
import ua.danit.final_project.dto.UserDto;
import ua.danit.final_project.entities.User;
import ua.danit.final_project.services.RegistrationService;

import javax.servlet.http.HttpServletRequest;
import java.util.Objects;

@RestController
public class AuthenticationController {

  @Value("${jwt.header}")
  private String tokenHeader;

  private final AuthenticationManager authenticationManager;
  private final JwtTokenUtil jwtTokenUtil;
  private final UserDetailsService userDetailsService;
  private final RegistrationService registrationService;
  private final DefaultMapper mapper;

  @Autowired
  public AuthenticationController(AuthenticationManager authenticationManager,
                                  JwtTokenUtil jwtTokenUtil,
                                  UserDetailsService userDetailsService,
                                  RegistrationService registrationService,
                                  DefaultMapper mapper) {
    this.authenticationManager = authenticationManager;
    this.jwtTokenUtil = jwtTokenUtil;
    this.userDetailsService = userDetailsService;
    this.registrationService = registrationService;
    this.mapper = mapper;
  }

  @PostMapping("/auth")
  public ResponseEntity<JwtAuthenticationResponse> createAuthenticationToken(
      @RequestBody JwtAuthenticationRequest authenticationRequest
  ) throws AuthenticationException {

    authenticate(authenticationRequest.getUserName(), authenticationRequest.getUserPassword());

    final UserDetails userDetails = userDetailsService.loadUserByUsername(authenticationRequest.getUserName());
    final String token = jwtTokenUtil.generateToken(userDetails);

    return ResponseEntity.ok(new JwtAuthenticationResponse(token));
  }

  @PostMapping("/register")
  public ResponseEntity register(@RequestBody User user)
      throws AuthenticationException {

    registrationService.register(user);
    return ResponseEntity.ok("New user created");
  }

  @GetMapping("/refresh")
  public ResponseEntity<JwtAuthenticationResponse> refreshAndGetAuthenticationToken(HttpServletRequest request) {
    String authToken = request.getHeader(tokenHeader);
    final String token = authToken.substring(7);
    String username = jwtTokenUtil.getUsernameFromToken(token);
    final User user = (User) userDetailsService.loadUserByUsername(username);

    if (jwtTokenUtil.canTokenBeRefreshed(token, user.getLastPasswordResetDate())) {
      String refreshedToken = jwtTokenUtil.refreshToken(token);
      return ResponseEntity.ok(new JwtAuthenticationResponse(refreshedToken));
    } else {
      return ResponseEntity.badRequest().body(null);
    }
  }

  @GetMapping("/user/current")
  public UserDto getCurrentUser(@AuthenticationPrincipal User user) {
    return mapper.userToUserDto(user);
  }

  private void authenticate(String username, String password) {
    Objects.requireNonNull(username);
    Objects.requireNonNull(password);

    try {
      authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
    } catch (DisabledException e) {
      throw new AuthenticationException("User is disabled!", e);
    } catch (BadCredentialsException e) {
      throw new AuthenticationException("Bad credentials!", e);
    }
  }
}
