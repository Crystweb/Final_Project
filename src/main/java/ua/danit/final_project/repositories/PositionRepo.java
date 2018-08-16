package ua.danit.final_project.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import ua.danit.final_project.entities.Position;

public interface PositionRepo extends JpaRepository<Position, Long> {
}
