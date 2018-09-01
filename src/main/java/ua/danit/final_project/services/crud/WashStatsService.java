package ua.danit.final_project.services.crud;

import ua.danit.final_project.entities.WashStats;

import java.util.List;

public interface WashStatsService {

  WashStats getById(Long id);

  List<WashStats> getAll();

  WashStats save(WashStats washStats);

  void deleteById(Long id);
}
