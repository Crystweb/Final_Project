package ua.danit.final_project.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ua.danit.final_project.configuration.SessionAware;
import ua.danit.final_project.entities.User;

@RestController
@RequestMapping("/test/user")
public class TestUserController extends SessionAware {

  @GetMapping
  public ResponseEntity<User> getStaticUser() {
    return ResponseEntity.ok(getCurrentUser());
  }

}
