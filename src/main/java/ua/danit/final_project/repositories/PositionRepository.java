package ua.danit.final_project.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ua.danit.final_project.entities.Position;

import java.util.List;

@Repository
public interface PositionRepository extends JpaRepository<Position, Long> {

  List<Position> getPositionByTitleIn(List<String> titles);
}
