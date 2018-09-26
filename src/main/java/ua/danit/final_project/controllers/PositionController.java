package ua.danit.final_project.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ua.danit.final_project.entities.Position;
import ua.danit.final_project.services.crud.PositionService;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/position")
public class PositionController {

  private final PositionService positionService;

  @Autowired
  public PositionController(PositionService positionService) {
    this.positionService = positionService;
  }

  @GetMapping
  public List<Position> getPermittedForComments() {
    return positionService.getAll().stream()
        .collect(Collectors.toList());
  }

  @GetMapping("/list")
  public List<Position> getPositions() {
    return positionService.findAll();
  }
}
