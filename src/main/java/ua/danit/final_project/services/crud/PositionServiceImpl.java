package ua.danit.final_project.services.crud;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ua.danit.final_project.entities.Position;
import ua.danit.final_project.repositories.PositionRepository;

import javax.persistence.EntityNotFoundException;
import java.util.List;

@Service
public class PositionServiceImpl implements PositionService{

  private final PositionRepository positionRepository;

  @Autowired
  public PositionServiceImpl(PositionRepository positionRepository) {
    this.positionRepository = positionRepository;
  }

  @Override
  public Position getById(Long id) {
    return positionRepository.findById(id).orElseThrow(EntityNotFoundException::new);
  }

  @Override
  public List<Position> getAll() {
    return positionRepository.findAll();
  }

  @Override
  public Position save(Position position) {
    return positionRepository.save(position);
  }

  @Override
  public void deleteById(Long id) {
    positionRepository.deleteById(id);
  }

  @Override
  public List<Position> findAll() {
    return positionRepository.findAll();
  }
}
