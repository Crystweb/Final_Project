package ua.danit.final_project.services.crud;

import ua.danit.final_project.entities.CleaningMaterial;

import java.util.List;

public interface CleaningMaterialService {
  CleaningMaterial getById(Long id);

  List<CleaningMaterial> getAll();

  CleaningMaterial save(CleaningMaterial cleaningMaterial);

  void deleteById(Long id);
}
