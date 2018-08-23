package ua.danit.final_project.services.crud;

import ua.danit.final_project.entities.BedLinenStats;

import java.util.List;

public interface BedLinenStatsService {
  BedLinenStats getById(Long id);

  List<BedLinenStats> getAll();

  BedLinenStats save(BedLinenStats bedLinenStats);

  void deleteById(Long id);
}
