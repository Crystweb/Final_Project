package ua.danit.final_project.services.crud;


import ua.danit.final_project.entities.Permission;

import java.util.List;

public interface PermissionService {

  Permission getById(Long id);

  List<Permission> getAll();

  Permission save(Permission permission);

  void deleteById(Long id);
}
