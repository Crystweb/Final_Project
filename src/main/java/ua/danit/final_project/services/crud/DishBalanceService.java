package ua.danit.final_project.services.crud;

import ua.danit.final_project.entities.DishBalance;

import java.util.List;

public interface DishBalanceService {

  DishBalance getById(Long id);

  List<DishBalance> getAll();

  DishBalance save(DishBalance dishBalance);

  void deleteById(Long id);
}
