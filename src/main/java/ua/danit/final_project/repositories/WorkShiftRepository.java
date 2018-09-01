package ua.danit.final_project.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ua.danit.final_project.entities.WorkShift;

@Repository
public interface WorkShiftRepository extends JpaRepository<WorkShift, Long> {

}
