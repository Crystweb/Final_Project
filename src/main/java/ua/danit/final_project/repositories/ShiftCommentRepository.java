package ua.danit.final_project.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import ua.danit.final_project.entities.ShiftComment;

import java.util.List;

@Repository
public interface ShiftCommentRepository extends JpaRepository<ShiftComment, Long> {

  @Query(value = "SELECT * FROM shift_comment WHERE id > :id", nativeQuery = true)
  List<ShiftComment> getAllByLastThreeWorkShiftId(@Param("id") Long id);

  @Query("SELECT MAX(id) FROM ShiftComment")
  Integer getMaxId();
}
