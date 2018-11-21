package ua.danit.final_project.configuration.security;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class JwtAuthenticationRequest {

  private String userName; // NOSONAR
  private String userPassword; // NOSONAR

}


