package ua.danit.final_project.services.crud;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ua.danit.final_project.configuration.StaticCollection;
import ua.danit.final_project.entities.User;
import ua.danit.final_project.entities.Vacancy;
import ua.danit.final_project.entities.VacancyStatus;
import ua.danit.final_project.repositories.VacancyRepository;

import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.sql.Timestamp;
import java.util.stream.Collectors;

@Service
public class VacancyServiceImpl implements VacancyService{
  private final VacancyRepository vacancyRepository;

  @Autowired
  public VacancyServiceImpl(VacancyRepository vacancyRepository) {
    this.vacancyRepository = vacancyRepository;
  }

  @Override
  public Vacancy getById(Long id) {
    return vacancyRepository.findById(id).orElseThrow(EntityNotFoundException::new);
  }

  @Override
  public List<Vacancy> getOpenVacancies() {
    return vacancyRepository.findAll().stream()
        .filter(v -> "OPENED".equals(v.getVacancyStatus()))
        .collect(Collectors.toList());
  }

  @Override
  public void deleteById(Long id) {
    vacancyRepository.deleteById(id);
  }

  @Override
  public Vacancy save(Vacancy vacancy) {
    vacancy.setPublication(new Timestamp(System.currentTimeMillis()));
    vacancy.setUser(StaticCollection.getUser());
    return vacancyRepository.save(vacancy);
  }
}