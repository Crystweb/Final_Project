package ua.danit.final_project.services.crud;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ua.danit.final_project.entities.WashStatsMaterial;
import ua.danit.final_project.repositories.WashStatsMaterialRepository;

import javax.persistence.EntityNotFoundException;
import java.util.List;

@Service
public class WashStatsMaterialServiceImpl implements WashStatsMaterialService {

  private final WashStatsMaterialRepository washStatsMaterialRepository;

  @Autowired
  public WashStatsMaterialServiceImpl(WashStatsMaterialRepository washStatsMaterialRepository) {
    this.washStatsMaterialRepository = washStatsMaterialRepository;
  }

  @Override
  public WashStatsMaterial getById(Long id) {
    return washStatsMaterialRepository.findById(id).orElseThrow(EntityNotFoundException::new);
  }

  @Override
  public List<WashStatsMaterial> getAll() {
    return washStatsMaterialRepository.findAll();
  }

  @Override
  public WashStatsMaterial save(WashStatsMaterial washStatsMaterial) {
    return washStatsMaterialRepository.save(washStatsMaterial);
  }

  @Override
  public void deleteById(Long id) {
    washStatsMaterialRepository.deleteById(id);
  }
}
