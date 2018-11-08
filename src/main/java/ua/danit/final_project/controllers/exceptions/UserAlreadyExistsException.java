package ua.danit.final_project.controllers.exceptions;

public class UserAlreadyExistsException extends RuntimeException {

  public UserAlreadyExistsException() {
    super("Username already exists");
  }
}
