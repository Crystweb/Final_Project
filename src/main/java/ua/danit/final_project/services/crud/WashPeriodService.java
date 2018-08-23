package ua.danit.final_project.services.crud;

import ua.danit.final_project.entities.WashPeriod;

import java.util.List;

public interface WashPeriodService {

  WashPeriod getById(Long id);

  List<WashPeriod> getAll();

  WashPeriod save(WashPeriod washPeriod);

  void deleteById(Long id);
}
