package ua.danit.final_project.services.crud;


import ua.danit.final_project.entities.Task;

import java.util.List;

public interface TaskServiceCrud {

  Task getById(Long id);

  List<Task> getAll();

  Task save(Task task);

  void deleteById(Long id);
}
