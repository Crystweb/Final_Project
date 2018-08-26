package ua.danit.final_project.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import ua.danit.final_project.entities.ShiftComment;

import java.util.List;

@Repository
public interface ShiftCommentRepository extends JpaRepository<ShiftComment, Long> {

  @Query("SELECT * FROM ShiftComment ")
  List<ShiftComment> getAllByLastThreeWorkShiftId(Long id);
}
