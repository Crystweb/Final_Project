package ua.danit.final_project.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ua.danit.final_project.entities.CheckIn;

import java.util.Date;
import java.util.List;

@Repository
public interface CheckInRepository extends JpaRepository<CheckIn, Long> {

  List<CheckIn> findAllByCreatedBetween(Date from, Date to);
}
