package ua.danit.final_project.configuration.security;

import lombok.AllArgsConstructor;
import lombok.Data;


@Data
@AllArgsConstructor
public class JwtAuthenticationRequest {

  private String userName; // NOSONAR
  private String userPassword; //NOSONAR

}


