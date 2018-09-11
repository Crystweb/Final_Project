package ua.danit.final_project.services.tasks;

import ua.danit.final_project.entities.Location;
import ua.danit.final_project.entities.Task;

import javax.persistence.EntityNotFoundException;
import java.util.List;

public interface TaskService {

  Task create(Task task);

  Task update(Task task);

  Task remove(Long taskId) throws EntityNotFoundException;

  List<Task> findAllActive();

  List<Task.TaskStatus> getStatuses();

  List<Task.TaskFrequency> getFrequencies();

  List<Task> findAllByLocation(Location location);
}
