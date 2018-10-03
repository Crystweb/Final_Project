package ua.danit.final_project.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ua.danit.final_project.configuration.SessionAware;
import ua.danit.final_project.dto.DefaultMapper;
import ua.danit.final_project.dto.UserDto;

@RestController
@RequestMapping("/test/user")
public class TestUserController extends SessionAware {

  private final DefaultMapper mapper;

  public TestUserController(DefaultMapper mapper) {
    this.mapper = mapper;
  }

  @GetMapping
  public UserDto getStaticUser() {
    return mapper.userToUserDto(getCurrentUser());
  }

}
