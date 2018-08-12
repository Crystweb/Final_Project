package ua.danit.final_project.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import ua.danit.final_project.entities.UserWorkShift;

public interface UserWorkShiftRepo extends JpaRepository<UserWorkShift, Long> {
}
