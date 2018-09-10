package ua.danit.final_project.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ua.danit.final_project.entities.Position;
import ua.danit.final_project.entities.Schedule;

import java.util.Date;
import java.util.List;

@Repository
public interface ScheduleRepository extends JpaRepository<Schedule, Long> {

  List<Schedule> findDistinctByPositionIn(List<Position> positions);

  List<Schedule> findAllByPositionAndExpired(Position position, Date expired);

  List<Schedule> findAllByCreatedDateBefore(Date date);
}
