package ua.danit.final_project.controllers.exceptions;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import javax.persistence.EntityNotFoundException;
import java.io.IOException;

@RestControllerAdvice
public class GeneralExceptionHandler {

  private final Logger logger = LoggerFactory.getLogger(GeneralExceptionHandler.class);

  @ExceptionHandler({RuntimeException.class})
  public ResponseEntity<ErrorResponse> handleRuntime(RuntimeException e) {
    logger.error(e.getMessage(), e);
    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
        .body(new ErrorResponse("Oops! Something went wrong...", 500));
  }

  @ExceptionHandler({IOException.class})
  public ResponseEntity<ErrorResponse> handleIO(IOException e) {
    logger.error(e.getMessage(), e);
    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
        .body(new ErrorResponse("Failed to upload file.", 500));
  }

  @ExceptionHandler({EntityNotFoundException.class})
  public ResponseEntity<ErrorResponse> handleNotFound(EntityNotFoundException e) {
    logger.warn(e.getMessage());
    return ResponseEntity.status(HttpStatus.NOT_FOUND)
        .body(new ErrorResponse("Could not found requested data", 404));
  }

  @ExceptionHandler({IllegalAccessException.class})
  public ResponseEntity<ErrorResponse> handleIllegalAccess(IllegalAccessException e) {
    logger.warn(e.getMessage());
    return ResponseEntity.status(HttpStatus.FORBIDDEN)
        .body(new ErrorResponse("Access denied.", 403));
  }

  @ExceptionHandler({IllegalArgumentException.class})
  public ResponseEntity<ErrorResponse> handleIllegalArgument(IllegalArgumentException e) {
    logger.warn(e.getMessage());
    return ResponseEntity.badRequest()
        .body(new ErrorResponse("Bad request.", 400));
  }
}
