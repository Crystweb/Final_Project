package ua.danit.final_project.controllers;

import org.springframework.web.bind.annotation.*;
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

  @RequestMapping(value = "/list", method = RequestMethod.GET)
  public List<Role> getRoles() {
    return roleService.findAll();
  }

  @RequestMapping(method = RequestMethod.POST)
  public Role createRole(@RequestParam("role") String role) {
    return roleService.create(role);
  }
}
