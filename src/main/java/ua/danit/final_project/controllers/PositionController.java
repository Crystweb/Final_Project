package ua.danit.final_project.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ua.danit.final_project.dto.DefaultMapper;
import ua.danit.final_project.dto.PositionDto;
import ua.danit.final_project.entities.Position;
import ua.danit.final_project.services.crud.PositionService;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/position")
public class PositionController {

  private final PositionService positionService;
  private final DefaultMapper mapper;

  @Autowired
  public PositionController(PositionService positionService, DefaultMapper mapper) {
    this.positionService = positionService;
    this.mapper = mapper;
  }

  @GetMapping
  public List<PositionDto> getPermittedForComments() {
    return positionService.getAll().stream()
        .filter(Position::getPinnedToComment)
        .map(mapper::positionToPositionDto)
        .collect(Collectors.toList());
  }

  @GetMapping("/list")
  public List<PositionDto> getPositions() {
    return positionService.findAll()
        .stream()
        .map(mapper::positionToPositionDto)
        .collect(Collectors.toList());
  }
}
