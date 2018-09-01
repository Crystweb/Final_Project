package ua.danit.final_project.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import ua.danit.final_project.entities.ShiftComment;

import java.util.Date;
import java.util.List;

@Repository
public interface ShiftCommentRepository extends JpaRepository<ShiftComment, Long> {

  @Query(value = "SELECT * FROM shift_comment WHERE id > :id AND w_shift_id = :workShiftId", nativeQuery = true)
  List<ShiftComment> getAllByLastThreeWorkShiftId(@Param("id") Long id,
                                                  @Param("workShiftId") Long workShiftId);

  @Query("SELECT MAX(id) FROM ShiftComment")
  Integer getMaxId();

  @Query(value = "SELECT * FROM shift_comment WHERE w_shift_id = :workShiftId AND c_date BETWEEN :from AND :to",
          nativeQuery = true)
  List<ShiftComment> findAllByDateBetweenAndWorkShift_Id(@Param("from") Date from,
                                                         @Param("to") Date to,
                                                         @Param("workShiftId") Long workShiftId);

}
