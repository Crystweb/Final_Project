package ua.danit.final_project.services.crud;


import ua.danit.final_project.entities.MealTimeCategory;

import java.util.List;

public interface MealTimeCategoryService {

  MealTimeCategory getById(Long id);

  List<MealTimeCategory> getAll();

  MealTimeCategory save(MealTimeCategory mealTimeCategory);

  void deleteById(Long id);
}
