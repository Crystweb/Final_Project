package ua.danit.final_project.controllers.exceptions;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
class ErrorResponse {

  private String message; // NOSONAR
  private int status; // NOSONAR
}
