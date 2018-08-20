package ua.danit.final_project.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ua.danit.final_project.entities.BedLinenType;

@Repository
public interface BedLinenTypeRepository extends JpaRepository<BedLinenType, Long> {
}
