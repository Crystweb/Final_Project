package ua.danit.final_project.services;

import ua.danit.final_project.entities.Role;

import java.util.List;

public interface RoleService {

  List<Role> findAll();

  Role findRole(String role);

  void remove(String role);

  Role create(String role);
}
