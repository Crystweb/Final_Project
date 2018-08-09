package ua.danit.final_project.services;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ua.danit.final_project.entities.Role;
import ua.danit.final_project.repositories.RoleRepo;

import javax.persistence.EntityNotFoundException;
import javax.validation.constraints.NotNull;
import java.util.List;

@Service
public class RoleServiceImpl implements RoleService {

  private final RoleRepo roleRepo;

  public RoleServiceImpl(RoleRepo roleRepo) {
    this.roleRepo = roleRepo;
  }

  @Override
  public List<Role> findAll() {
    return roleRepo.findAll();
  }

  @Override
  public Role findRole(@NotNull String role) {
    return roleRepo.findByName(role).orElseThrow(EntityNotFoundException::new);
  }

  @Override
  @Transactional
  public void remove(@NotNull String role) {
    roleRepo.deleteByName(role);
  }

  @Override
  public Role create(@NotNull String role) {
    Role newRole = new Role();
    newRole.setName(role);

    return roleRepo.save(newRole);
  }
}
