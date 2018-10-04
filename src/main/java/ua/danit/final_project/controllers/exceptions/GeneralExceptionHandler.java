package ua.danit.final_project.controllers.exceptions;

import com.fasterxml.jackson.databind.exc.MismatchedInputException;
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
  public ResponseEntity<ErrorResponse> handleRuntime(RuntimeException exception) {
    logger.error(exception.getMessage(), exception);
    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
        .body(new ErrorResponse("Oops! Something went wrong...", 500));
  }

  @ExceptionHandler({IOException.class})
  public ResponseEntity<ErrorResponse> handleUploadException(IOException exception) {
    logger.error(exception.getMessage(), exception);
    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
        .body(new ErrorResponse("Failed to upload file.", 500));
  }

  @ExceptionHandler({MismatchedInputException.class})
  public ResponseEntity<ErrorResponse> handleUploadException(MismatchedInputException exception) {
    logger.warn(exception.getMessage());
    return ResponseEntity.status(HttpStatus.BAD_REQUEST)
        .body(new ErrorResponse("Mismatched JSON input.", 400));
  }

  @ExceptionHandler({EntityNotFoundException.class})
  public ResponseEntity<ErrorResponse> handleNotFound(EntityNotFoundException exception) {
    logger.warn(exception.getMessage());
    return ResponseEntity.status(HttpStatus.NOT_FOUND)
        .body(new ErrorResponse("Could not found requested data", 404));
  }

  @ExceptionHandler({IllegalAccessException.class})
  public ResponseEntity<ErrorResponse> handleIllegalAccess(IllegalAccessException exception) {
    logger.warn(exception.getMessage());
    return ResponseEntity.status(HttpStatus.FORBIDDEN)
        .body(new ErrorResponse("Access denied.", 403));
  }

  @ExceptionHandler({IllegalArgumentException.class})
  public ResponseEntity<ErrorResponse> handleIllegalArgument(IllegalArgumentException exception) {
    logger.warn(exception.getMessage());
    return ResponseEntity.badRequest()
        .body(new ErrorResponse("Bad request.", 400));
  }
}
