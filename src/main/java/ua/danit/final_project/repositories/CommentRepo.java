package ua.danit.final_project.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ua.danit.final_project.entities.Comment;

@Repository
public interface CommentRepo extends JpaRepository<Comment, Long> {
}
