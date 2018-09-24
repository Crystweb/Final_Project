package ua.danit.final_project.services.crud;

import ua.danit.final_project.entities.Position;
import ua.danit.final_project.entities.User;
import ua.danit.final_project.entities.Vacancy;

import java.util.List;

public interface VacancyServiceCrud {

  Vacancy getById(Long id);

  List<Vacancy> getOpenVacancies();

  Vacancy save(Vacancy vacancy);

  Vacancy updateVacancy(Vacancy vacancy, User userFromToken) throws IllegalAccessException;

  void deleteVacancy(Vacancy vacancy, User userFromToken) throws IllegalAccessException;

  Position getPositionByTitle(String title);

  User getUserByid(Long userId);

  Position createIfNotExist(String title);
}