package ua.danit.final_project.services.crud;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ua.danit.final_project.entities.Role;
import ua.danit.final_project.repositories.RoleRepository;

import javax.persistence.EntityNotFoundException;
import java.util.List;

@Service
public class RoleServiceImpl implements RoleService {

  private final RoleRepository roleRepository;

  @Autowired
  public RoleServiceImpl(RoleRepository roleRepository) {
    this.roleRepository = roleRepository;
  }

  @Override
  public Role getById(Long id) {
    return roleRepository.findById(id).orElseThrow(EntityNotFoundException::new);
  }

  @Override
  public List<Role> getAll() {
    return roleRepository.findAll();
  }

  @Override
  public Role save(Role role) {
    return roleRepository.save(role);
  }

  @Override
  public void deleteById(Long id) {
    roleRepository.deleteById(id);
  }
}
