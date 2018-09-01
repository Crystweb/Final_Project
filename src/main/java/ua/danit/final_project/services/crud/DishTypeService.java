package ua.danit.final_project.services.crud;


import ua.danit.final_project.entities.DishType;

import java.util.List;

public interface DishTypeService {

  DishType getById(Long id);

  List<DishType> getAll();

  DishType save(DishType dishType);

  void deleteById(Long id);
}
