package ua.danit.final_project.services.crud;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ua.danit.final_project.entities.CleaningMaterial;
import ua.danit.final_project.repositories.CleaningMaterialRepository;

import javax.persistence.EntityNotFoundException;
import java.util.List;

@Service
public class CleaningMaterialServiceImpl implements CleaningMaterialService {

  private final CleaningMaterialRepository cleaningMaterialRepository;

  @Autowired
  public CleaningMaterialServiceImpl(CleaningMaterialRepository cleaningMaterialRepository) {
    this.cleaningMaterialRepository = cleaningMaterialRepository;
  }

  @Override
  public CleaningMaterial getById(Long id) {
    return cleaningMaterialRepository.findById(id).orElseThrow(EntityNotFoundException::new);
  }

  @Override
  public List<CleaningMaterial> getAll() {
    return cleaningMaterialRepository.findAll();
  }

  @Override
  public CleaningMaterial save(CleaningMaterial cleaningMaterial) {
    return cleaningMaterialRepository.save(cleaningMaterial);
  }

  @Override
  public void deleteById(Long id) {
    cleaningMaterialRepository.deleteById(id);
  }
}
