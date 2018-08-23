package ua.danit.final_project.services.crud;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ua.danit.final_project.entities.DishType;
import ua.danit.final_project.repositories.DishTypeRepository;

import javax.persistence.EntityNotFoundException;
import java.util.List;

@Service
public class DishTypeServiceImpl implements DishTypeService{

  private final DishTypeRepository dishTypeRepository;

  @Autowired
  public DishTypeServiceImpl(DishTypeRepository dishTypeRepository) {
    this.dishTypeRepository = dishTypeRepository;
  }

  @Override
  public DishType getById(Long id) {
    return dishTypeRepository.findById(id).orElseThrow(EntityNotFoundException::new);
  }

  @Override
  public List<DishType> getAll() {
    return dishTypeRepository.findAll();
  }

  @Override
  public DishType save(DishType dishType) {
    return dishTypeRepository.save(dishType);
  }

  @Override
  public void deleteById(Long id) {
    dishTypeRepository.deleteById(id);
  }
}
