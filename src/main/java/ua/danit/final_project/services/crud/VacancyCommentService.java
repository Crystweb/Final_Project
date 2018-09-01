package ua.danit.final_project.services.crud;


import ua.danit.final_project.entities.VacancyComment;

import java.util.List;

public interface VacancyCommentService {

  VacancyComment getById(Long id);

  List<VacancyComment> getAll();

  VacancyComment save(VacancyComment vacancyComment);

  void deleteById(Long id);
}
