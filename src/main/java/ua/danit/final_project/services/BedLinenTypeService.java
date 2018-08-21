package ua.danit.final_project.services;

import ua.danit.final_project.entities.BedLinenType;

import java.util.List;

public interface BedLinenTypeService {

  BedLinenType getById(Long id);

  List<BedLinenType> getAll();

  BedLinenType save(BedLinenType bedLinenType);

  void deleteById(Long id);
}
