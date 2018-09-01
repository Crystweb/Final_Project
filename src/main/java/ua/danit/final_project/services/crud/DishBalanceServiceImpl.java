package ua.danit.final_project.services.crud;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ua.danit.final_project.entities.DishBalance;
import ua.danit.final_project.repositories.DishBalanceRepository;

import javax.persistence.EntityNotFoundException;
import java.util.List;

@Service
public class DishBalanceServiceImpl implements DishBalanceService {

  private final DishBalanceRepository dishBalanceRepository;

  @Autowired
  public DishBalanceServiceImpl(DishBalanceRepository dishBalanceRepository) {
    this.dishBalanceRepository = dishBalanceRepository;
  }

  @Override
  public DishBalance getById(Long id) {
    return dishBalanceRepository.findById(id).orElseThrow(EntityNotFoundException::new);
  }

  @Override
  public List<DishBalance> getAll() {
    return dishBalanceRepository.findAll();
  }

  @Override
  public DishBalance save(DishBalance dishBalance) {
    return dishBalanceRepository.save(dishBalance);
  }

  @Override
  public void deleteById(Long id) {
    dishBalanceRepository.deleteById(id);
  }
}
