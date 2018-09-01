package ua.danit.final_project.services.crud;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ua.danit.final_project.entities.MealTimeCategory;
import ua.danit.final_project.repositories.MealTimeCategoryRepository;

import javax.persistence.EntityNotFoundException;
import java.util.List;

@Service
public class MealTimeCategoryServiceImpl implements MealTimeCategoryService {

  private final MealTimeCategoryRepository mealTimeCategoryRepository;

  @Autowired
  public MealTimeCategoryServiceImpl(MealTimeCategoryRepository mealTimeCategoryRepository) {
    this.mealTimeCategoryRepository = mealTimeCategoryRepository;
  }

  @Override
  public MealTimeCategory getById(Long id) {
    return mealTimeCategoryRepository.findById(id).orElseThrow(EntityNotFoundException::new);
  }

  @Override
  public List<MealTimeCategory> getAll() {
    return mealTimeCategoryRepository.findAll();
  }

  @Override
  public MealTimeCategory save(MealTimeCategory mealTimeCategory) {
    return mealTimeCategoryRepository.save(mealTimeCategory);
  }

  @Override
  public void deleteById(Long id) {
    mealTimeCategoryRepository.deleteById(id);
  }
}
