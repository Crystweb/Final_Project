package ua.danit.final_project.services.crud;

import ua.danit.final_project.dto.VacancyDto;
import ua.danit.final_project.entities.Vacancy;

import java.util.List;

public interface VacancyServiceCrud {

  VacancyDto getById(Long id);

  List<VacancyDto> getOpenVacancies();

  VacancyDto create(VacancyDto vacancyDto);

  VacancyDto updateVacancy(VacancyDto vacancyDto);

  void deleteVacancy(Vacancy vacancy);
}