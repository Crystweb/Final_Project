package ua.danit.final_project.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import ua.danit.final_project.entities.Comment;

@Repository
public interface CommentRepo extends JpaRepository<Comment, Long> {

  @Query(value = "SELECT * FROM comment ORDER BY c_date DESC LIMIT 1;", nativeQuery = true)
  Comment findLast();
}
