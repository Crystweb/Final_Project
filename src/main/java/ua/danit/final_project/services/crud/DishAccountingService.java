package ua.danit.final_project.services.crud;

import ua.danit.final_project.entities.DishAccounting;

import java.util.List;

public interface DishAccountingService {

  DishAccounting getById(Long id);

  List<DishAccounting> getAll();

  DishAccounting save(DishAccounting dishAccounting);

  void deleteById(Long id);
}
