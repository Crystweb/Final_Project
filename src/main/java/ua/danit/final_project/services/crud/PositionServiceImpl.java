package ua.danit.final_project.services.crud;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ua.danit.final_project.dto.DefaultMapper;
import ua.danit.final_project.dto.PositionDto;
import ua.danit.final_project.entities.Position;
import ua.danit.final_project.repositories.PositionRepository;

import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PositionServiceImpl implements PositionService {

  private final PositionRepository positionRepository;
  private final DefaultMapper mapper;

  @Autowired
  public PositionServiceImpl(PositionRepository positionRepository,
                             DefaultMapper mapper) {
    this.positionRepository = positionRepository;
    this.mapper = mapper;
  }

  @Override
  public PositionDto getById(Long id) {
    return positionRepository.findById(id)
        .map(mapper::positionToPositionDto)
        .orElseThrow(EntityNotFoundException::new);
  }

  @Override
  public List<PositionDto> getAll() {
    return positionRepository.findAll()
        .stream()
        .map(mapper::positionToPositionDto)
        .collect(Collectors.toList());
  }

  @Override
  public PositionDto save(PositionDto positionDto) {
    Position position = mapper.positionDtoToPosition(positionDto);
    position = positionRepository.save(position);
    return mapper.positionToPositionDto(position);
  }

  @Override
  public void deleteById(Long id) {
    positionRepository.deleteById(id);
  }

  @Override
  public List<PositionDto> findAll() {
    return positionRepository.findAll()
        .stream()
        .map(mapper::positionToPositionDto)
        .collect(Collectors.toList());
  }

  @Override
  public List<PositionDto> getAllPinnedToComment() {
    return findAll().stream()
        .filter(PositionDto::getPinnedToComment)
        .collect(Collectors.toList());
  }
}
