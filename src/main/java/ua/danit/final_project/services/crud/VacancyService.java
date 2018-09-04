package ua.danit.final_project.services.crud;

import ua.danit.final_project.entities.Position;
import ua.danit.final_project.entities.User;
import ua.danit.final_project.entities.Vacancy;

import java.util.List;

public interface VacancyService {

  Vacancy getById(Long id);

  List<Vacancy> getAll();

  Vacancy save(User user, Position position, Integer salary, String status, String info, Long time);

  void deleteById(Long id);
}
