package ua.danit.final_project.services.crud;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ua.danit.final_project.configuration.StaticCollection;
import ua.danit.final_project.entities.User;
import ua.danit.final_project.entities.Vacancy;
import ua.danit.final_project.repositories.VacancyRepository;

import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.sql.Timestamp;
import java.util.stream.Collectors;

@Service
public class VacancyServiceCrudImpl implements VacancyServiceCrud {
  private final VacancyRepository vacancyRepository;

  @Autowired
  public VacancyServiceCrudImpl(VacancyRepository vacancyRepository) {
    this.vacancyRepository = vacancyRepository;
  }

  @Override
  public Vacancy getById(Long id) {
    return vacancyRepository.findById(id).orElseThrow(EntityNotFoundException::new);
  }

  @Override
  public List<Vacancy> getOpenVacancies() {
    return vacancyRepository.findAll().stream()
        .filter(v -> Vacancy.VacancyStatus.OPENED.equals(v.getVacancyStatus()))
        .collect(Collectors.toList());
  }

  @Override
  public Vacancy save(Vacancy vacancy) {
    vacancy.setPublication(new Timestamp(System.currentTimeMillis()));
    vacancy.setUser(StaticCollection.getUser());
    return vacancyRepository.save(vacancy);
  }

  @Override
  public Vacancy updateVacancy(Vacancy vacancy, User userFromToken) throws IllegalAccessException {

    if (vacancy.getUser().getId().equals(userFromToken.getId())) {
      String message = "User dont have permission to update this vacancy - id: " + vacancy.getId();
      throw new IllegalAccessException(message);
    }

    return vacancyRepository.save(vacancy);
  }

  @Override
  public void deleteVacancy(Vacancy vacancy, User userFromToken) throws IllegalAccessException {

    if (vacancy.getUser().getId().equals(userFromToken.getId())) {
      String message = "User dont have permission to delete this vacancy - id: " + vacancy.getId();
      throw new IllegalAccessException(message);
    }

    vacancyRepository.delete(vacancy);
  }
}
