package ua.danit.final_project.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ua.danit.final_project.entities.Task;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
}
