package ua.danit.final_project.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ua.danit.final_project.entities.Location;
import ua.danit.final_project.entities.Task;

import java.util.Date;
import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {

  List<Task> findAllByStatusNotIn(List<Task.TaskStatus> statuses);

  List<Task> findAllByFrequencyAndStatusNot(Task.TaskFrequency frequency, Task.TaskStatus status);

  List<Task> findAllByExpiredIsBetween(Date from, Date to);

  List<Task> findAllByLocationsContains(Location location);
}
