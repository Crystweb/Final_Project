package ua.danit.final_project.services.crud;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ua.danit.final_project.entities.DishAccounting;
import ua.danit.final_project.repositories.DishAccountingRepository;

import javax.persistence.EntityNotFoundException;
import java.util.List;

@Service
public class DishAccountingServiceImpl implements DishAccountingService{

  private final DishAccountingRepository dishAccountingRepository;

  @Autowired
  public DishAccountingServiceImpl(DishAccountingRepository dishAccountingRepository) {
    this.dishAccountingRepository = dishAccountingRepository;
  }

  @Override
  public DishAccounting getById(Long id) {
    return dishAccountingRepository.findById(id).orElseThrow(EntityNotFoundException::new);
  }

  @Override
  public List<DishAccounting> getAll() {
    return dishAccountingRepository.findAll();
  }

  @Override
  public DishAccounting save(DishAccounting dishAccounting) {
    return dishAccountingRepository.save(dishAccounting);
  }

  @Override
  public void deleteById(Long id) {
    dishAccountingRepository.deleteById(id);
  }
}
