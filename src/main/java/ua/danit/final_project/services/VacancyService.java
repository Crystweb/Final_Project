package ua.danit.final_project.services;


import ua.danit.final_project.entities.Vacancy;
import java.util.List;

public interface VacancyService {

  List<Vacancy> findAll();

  Vacancy findVacancy(String position);

  void remove(String vacancy);

  Vacancy create(String position, Integer salary, Long time);
}
