package ua.danit.final_project.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import ua.danit.final_project.entities.Location;

import java.util.List;

@Repository
public interface LocationRepository extends JpaRepository<Location, Long> {

  @Query("FROM Location WHERE parentLocation = null")
  List<Location> findLocationsWithoutParent();
}
