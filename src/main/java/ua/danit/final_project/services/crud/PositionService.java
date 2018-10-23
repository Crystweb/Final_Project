package ua.danit.final_project.services.crud;

import ua.danit.final_project.dto.PositionDto;

import java.util.List;

public interface PositionService {

  PositionDto getById(Long id);

  List<PositionDto> getAll();

  PositionDto save(PositionDto position);

  void deleteById(Long id);

  List<PositionDto> findAll();

  List<PositionDto> getAllPinnedToComment();
}
