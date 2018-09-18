package ua.danit.final_project.services.crud;

import ua.danit.final_project.entities.Position;

import java.util.List;

public interface PositionService {

  Position getById(Long id);

  List<Position> getAll();

  Position save(Position position);

  void deleteById(Long id);

  List<Position> findAll();
}
