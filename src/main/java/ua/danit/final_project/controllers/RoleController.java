package ua.danit.final_project.controllers;

import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import ua.danit.final_project.entities.Role;
import ua.danit.final_project.services.RoleService;
import java.util.List;

@RestController
@RequestMapping("/role")
public class RoleController {

  private final RoleService roleService;

  public RoleController(RoleService roleService) {
    this.roleService = roleService;
  }

  @GetMapping
  public List<Role> getRoles() {
    return roleService.findAll();
  }

  @PostMapping
  public Role createRole(@RequestParam("role") String role) {
    return roleService.create(role);
  }
}
