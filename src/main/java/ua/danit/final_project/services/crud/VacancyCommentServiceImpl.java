package ua.danit.final_project.services.crud;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ua.danit.final_project.entities.VacancyComment;
import ua.danit.final_project.repositories.VacancyCommentRepository;

import javax.persistence.EntityNotFoundException;
import java.util.List;

@Service
public class VacancyCommentServiceImpl implements VacancyCommentService {

  private final VacancyCommentRepository vacancyCommentRepository;

  @Autowired
  public VacancyCommentServiceImpl(VacancyCommentRepository vacancyCommentRepository) {
    this.vacancyCommentRepository = vacancyCommentRepository;
  }

  @Override
  public VacancyComment getById(Long id) {
    return vacancyCommentRepository.findById(id).orElseThrow(EntityNotFoundException::new);
  }

  @Override
  public List<VacancyComment> getAll() {
    return vacancyCommentRepository.findAll();
  }

  @Override
  public VacancyComment save(VacancyComment vacancyComment) {
    return vacancyCommentRepository.save(vacancyComment);
  }

  @Override
  public void deleteById(Long id) {
    vacancyCommentRepository.deleteById(id);
  }
}
