package ua.danit.final_project.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ua.danit.final_project.entities.TaskComment;

@Repository
public interface TaskCommentRepository extends JpaRepository<TaskComment, Long> {
}
