package ua.danit.final_project.services.crud;

import ua.danit.final_project.entities.Vacancy;

import java.util.List;

public interface VacancyService {

  Vacancy getById(Long id);

  List<Vacancy> getAll();

  Vacancy save(Vacancy vacancy);

  void deleteById(Long id);
}
