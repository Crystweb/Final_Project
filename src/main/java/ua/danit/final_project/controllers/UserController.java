package ua.danit.final_project.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ua.danit.final_project.dto.DefaultMapper;
import ua.danit.final_project.dto.UserDto;
import ua.danit.final_project.services.crud.UserService;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/user")
public class UserController {

  private final UserService userService;
  private final DefaultMapper mapper;

  @Autowired
  public UserController(UserService userService,
                        DefaultMapper mapper) {
    this.userService = userService;
    this.mapper = mapper;
  }

  @GetMapping
  public List<UserDto> getUsers() {
    return userService.getAll()
        .stream()
        .map(mapper::userToUserDto)
        .collect(Collectors.toList());
  }

  @GetMapping("/{id}")
  public UserDto getUserById(@PathVariable("id") Long id) {
    return mapper.userToUserDto(userService.getById(id));
  }
}
