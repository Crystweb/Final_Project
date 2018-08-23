package ua.danit.final_project.services.crud;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ua.danit.final_project.entities.Permission;
import ua.danit.final_project.repositories.PermissionRepository;

import javax.persistence.EntityNotFoundException;
import java.util.List;

@Service
public class PermissionServiceImpl implements PermissionService {

  private final PermissionRepository permissionRepository;

  @Autowired
  public PermissionServiceImpl(PermissionRepository permissionRepository) {
    this.permissionRepository = permissionRepository;
  }

  @Override
  public Permission getById(Long id) {
    return permissionRepository.findById(id).orElseThrow(EntityNotFoundException::new);
  }

  @Override
  public List<Permission> getAll() {
    return permissionRepository.findAll();
  }

  @Override
  public Permission save(Permission permission) {
    return permissionRepository.save(permission);
  }

  @Override
  public void deleteById(Long id) {
    permissionRepository.deleteById(id);
  }
}
