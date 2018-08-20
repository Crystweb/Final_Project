package ua.danit.final_project.services;


import ua.danit.final_project.entities.Role;

import java.util.List;

public interface RoleService {

  Role getById(Long id);

  List<Role> getAll();

  Role save(Role role);

  void deleteById(Long id);
}
