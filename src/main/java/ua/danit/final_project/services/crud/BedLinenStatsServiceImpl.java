package ua.danit.final_project.services.crud;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ua.danit.final_project.entities.BedLinenStats;
import ua.danit.final_project.repositories.BedLinenStatsRepository;

import javax.persistence.EntityNotFoundException;
import java.util.List;

@Service
public class BedLinenStatsServiceImpl implements BedLinenStatsService {


  private final BedLinenStatsRepository bedLinenStatsRepository;

  @Autowired
  public BedLinenStatsServiceImpl(BedLinenStatsRepository bedLinenStatsRepository) {
    this.bedLinenStatsRepository = bedLinenStatsRepository;
  }

  @Override
  public BedLinenStats getById(Long id) {
    return bedLinenStatsRepository.findById(id).orElseThrow(EntityNotFoundException::new);
  }

  @Override
  public List<BedLinenStats> getAll() {
    return bedLinenStatsRepository.findAll();
  }

  @Override
  public BedLinenStats save(BedLinenStats bedLinenStats) {
    return bedLinenStatsRepository.save(bedLinenStats);
  }

  @Override
  public void deleteById(Long id) {
    bedLinenStatsRepository.deleteById(id);
  }
}
