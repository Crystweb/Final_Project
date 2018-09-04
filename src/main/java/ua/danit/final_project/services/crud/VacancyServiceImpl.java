package ua.danit.final_project.services.crud;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ua.danit.final_project.entities.Position;
import ua.danit.final_project.entities.User;
import ua.danit.final_project.entities.Vacancy;
import ua.danit.final_project.repositories.VacancyRepository;

import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.sql.Timestamp;

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
  public List<Vacancy> getAll() {
    return vacancyRepository.findAll();
  }

  @Override
  public Vacancy save(User user, Position position, Integer salary, String status, String info, Long time) {
    Vacancy vacancy = new Vacancy();
    vacancy.setUser(user);
    vacancy.setPosition(position);
    vacancy.setSalary(salary);
    vacancy.setStatus(status);
    vacancy.setInfo(info);
    vacancy.setPublication(new Timestamp(time));
    return vacancyRepository.save(vacancy);
  }

  @Override
  public void deleteById(Long id) {
    vacancyRepository.deleteById(id);
  }
}
