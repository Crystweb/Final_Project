package ua.danit.final_project.services.crud;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ua.danit.final_project.entities.ShiftComment;
import ua.danit.final_project.repositories.ShiftCommentRepository;

import javax.persistence.EntityNotFoundException;
import java.util.List;

@Service
public class ShiftCommentServiceImpl implements ShiftCommentService{

  private final ShiftCommentRepository shiftCommentRepository;

  @Autowired
  public ShiftCommentServiceImpl(ShiftCommentRepository shiftCommentRepository) {
    this.shiftCommentRepository = shiftCommentRepository;
  }

  @Override
  public ShiftComment getById(Long id) {
    return shiftCommentRepository.findById(id).orElseThrow(EntityNotFoundException::new);
  }

  @Override
  public List<ShiftComment> getAll() {
    return shiftCommentRepository.findAll();
  }

  @Override
  public ShiftComment save(ShiftComment shiftComment) {
    return shiftCommentRepository.save(shiftComment);
  }

  @Override
  public void deleteById(Long id) {
    shiftCommentRepository.deleteById(id);
  }
}
