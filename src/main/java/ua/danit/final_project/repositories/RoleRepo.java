package ua.danit.final_project.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ua.danit.final_project.entities.Role;

/**
 * RoleRepo - repository.
 */

@Repository
public interface RoleRepo extends JpaRepository<Role, Long> {

}
