package ua.danit.final_project.services;


import ua.danit.final_project.entities.WashStatsMaterial;

import java.util.List;

public interface WashStatsMaterialService {

  WashStatsMaterial getById(Long id);

  List<WashStatsMaterial> getAll();

  WashStatsMaterial save(WashStatsMaterial washStatsMaterial);

  void deleteById(Long id);
}
