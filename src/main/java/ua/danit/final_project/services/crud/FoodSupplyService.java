package ua.danit.final_project.services.crud;

import ua.danit.final_project.entities.FoodSupply;

import java.util.List;

public interface FoodSupplyService {

  FoodSupply getById(Long id);

  List<FoodSupply> getAll();

  FoodSupply save(FoodSupply foodSupply);

  void deleteById(Long id);
}
