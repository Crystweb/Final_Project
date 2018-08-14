package ua.danit.final_project.services;

import org.springframework.stereotype.Service;
import ua.danit.final_project.entities.Vacancy;
import ua.danit.final_project.repositories.VacancyRepo;
import javax.persistence.EntityNotFoundException;
import javax.validation.constraints.NotNull;
import java.sql.Timestamp;
import java.util.List;

@Service
public class VacancyServiceImpl implements VacancyService {

  private final VacancyRepo vacancyRepo;

  public VacancyServiceImpl(VacancyRepo vacancyRepo) {
    this.vacancyRepo = vacancyRepo;
  }

  @Override
  public List<Vacancy> findAll() {
    return vacancyRepo.findAll();
  }

  @Override
  public Vacancy findVacancy(@NotNull String position) {
    return vacancyRepo.findByPosition(position).orElseThrow(EntityNotFoundException::new);
  }

  @Override
  public void remove(String position) {
    vacancyRepo.removeByPosition(position);
  }

  @Override
  public Vacancy create(String position, Integer salary, Long time) {
    Vacancy vacancy = new Vacancy();
    vacancy.setPosition(position);
    vacancy.setSalary(salary);
    vacancy.setPublication(new Timestamp(time));
    return vacancyRepo.save(vacancy);
  }
}
