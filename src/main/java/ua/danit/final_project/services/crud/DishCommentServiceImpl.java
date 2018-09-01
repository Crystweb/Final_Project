package ua.danit.final_project.services.crud;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ua.danit.final_project.entities.DishComment;
import ua.danit.final_project.repositories.DishCommentRepository;

import javax.persistence.EntityNotFoundException;
import java.util.List;

@Service
public class DishCommentServiceImpl implements DishCommentService{

  private final DishCommentRepository dishCommentRepository;

  @Autowired
  public DishCommentServiceImpl(DishCommentRepository dishCommentRepository) {
    this.dishCommentRepository = dishCommentRepository;
  }

  @Override
  public DishComment getById(Long id) {
    return dishCommentRepository.findById(id).orElseThrow(EntityNotFoundException::new);
  }

  @Override
  public List<DishComment> getAll() {
    return dishCommentRepository.findAll();
  }

  @Override
  public DishComment save(DishComment dishComment) {
    return dishCommentRepository.save(dishComment);
  }

  @Override
  public void deleteById(Long id) {
    dishCommentRepository.deleteById(id);
  }
}
