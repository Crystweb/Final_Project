package ua.danit.final_project.services.tasks;

import org.springframework.web.multipart.MultipartFile;
import ua.danit.final_project.entities.Location;
import ua.danit.final_project.entities.Task;

import javax.persistence.EntityNotFoundException;
import java.io.IOException;
import java.util.List;

public interface TaskService {

  Task create(Task task, MultipartFile file) throws IOException;

  Task update(Task task);

  Task remove(Long taskId) throws EntityNotFoundException;

  List<Task> findAllActive();

  List<Task.TaskStatus> getStatuses();

  List<Task.TaskFrequency> getFrequencies();

  List<Task> findAllByLocation(Location location);
}
