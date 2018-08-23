package ua.danit.final_project.services.crud;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ua.danit.final_project.entities.FoodSupply;
import ua.danit.final_project.repositories.FoodSupplyRepository;

import javax.persistence.EntityNotFoundException;
import java.util.List;

@Service
public class FoodSupplyServiceImpl implements FoodSupplyService {

  private final FoodSupplyRepository foodSupplyRepository;

  @Autowired
  public FoodSupplyServiceImpl(FoodSupplyRepository foodSupplyRepository) {
    this.foodSupplyRepository = foodSupplyRepository;
  }

  @Override
  public FoodSupply getById(Long id) {
    return foodSupplyRepository.findById(id).orElseThrow(EntityNotFoundException::new);
  }

  @Override
  public List<FoodSupply> getAll() {
    return foodSupplyRepository.findAll();
  }

  @Override
  public FoodSupply save(FoodSupply foodSupply) {
    return foodSupplyRepository.save(foodSupply);
  }

  @Override
  public void deleteById(Long id) {
    foodSupplyRepository.deleteById(id);
  }
}
