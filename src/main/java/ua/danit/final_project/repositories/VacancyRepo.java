package ua.danit.final_project.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ua.danit.final_project.entities.Vacancy;

import java.util.Optional;

@Repository
public interface VacancyRepo extends JpaRepository<Vacancy, Long> {

  Optional<Vacancy> findByPosition(String position);

  void removeByPosition(String position);
}
