package ua.danit.final_project.configuration.security;

public class JwtAuthenticationResponse {

  private final String token;

  public JwtAuthenticationResponse(String token) {
    this.token = token;
  }

  public String getToken() {
    return this.token;
  }
}
