package ua.danit.final_project.services.crud;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ua.danit.final_project.entities.WashStats;
import ua.danit.final_project.repositories.WashStatsRepository;

import javax.persistence.EntityNotFoundException;
import java.util.List;

@Service
public class WashStatsServiceImpl implements WashStatsService {

  private final WashStatsRepository washStatsRepository;

  @Autowired
  public WashStatsServiceImpl(WashStatsRepository washStatsRepository) {
    this.washStatsRepository = washStatsRepository;
  }

  @Override
  public WashStats getById(Long id) {
    return washStatsRepository.findById(id).orElseThrow(EntityNotFoundException::new);
  }

  @Override
  public List<WashStats> getAll() {
    return washStatsRepository.findAll();
  }

  @Override
  public WashStats save(WashStats washStats) {
    return washStatsRepository.save(washStats);
  }

  @Override
  public void deleteById(Long id) {
    washStatsRepository.deleteById(id);
  }
}
