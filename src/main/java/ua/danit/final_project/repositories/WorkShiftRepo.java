package ua.danit.final_project.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import ua.danit.final_project.entities.WorkShift;

public interface WorkShiftRepo extends JpaRepository<WorkShift, Long> {
}
