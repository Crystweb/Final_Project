package ua.danit.final_project.services.tasks;

import org.springframework.web.multipart.MultipartFile;
import ua.danit.final_project.dto.TaskDto;
import ua.danit.final_project.entities.Location;
import ua.danit.final_project.entities.Task;

import javax.persistence.EntityNotFoundException;
import java.io.IOException;
import java.util.List;

public interface TaskService {

  TaskDto create(TaskDto task, MultipartFile file) throws IOException;

  TaskDto update(TaskDto task);

  TaskDto remove(Long taskId) throws EntityNotFoundException;

  List<TaskDto> findAllActive();

  List<Task.TaskStatus> getStatuses();

  List<Task.TaskFrequency> getFrequencies();

  List<TaskDto> findAllByLocation(Location location);
}
