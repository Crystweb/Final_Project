package ua.danit.final_project.services.crud;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ua.danit.final_project.entities.WashPeriod;
import ua.danit.final_project.repositories.WashPeriodRepository;

import javax.persistence.EntityNotFoundException;
import java.util.List;

@Service
public class WashPeriodServiceImpl implements WashPeriodService {

  private final WashPeriodRepository washPeriodRepository;

  @Autowired
  public WashPeriodServiceImpl(WashPeriodRepository washPeriodRepository) {
    this.washPeriodRepository = washPeriodRepository;
  }

  @Override
  public WashPeriod getById(Long id) {
    return washPeriodRepository.findById(id).orElseThrow(EntityNotFoundException::new);
  }

  @Override
  public List<WashPeriod> getAll() {
    return washPeriodRepository.findAll();
  }

  @Override
  public WashPeriod save(WashPeriod washPeriod) {
    return washPeriodRepository.save(washPeriod);
  }

  @Override
  public void deleteById(Long id) {
    washPeriodRepository.deleteById(id);
  }
}
