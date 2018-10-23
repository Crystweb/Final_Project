package ua.danit.final_project.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ua.danit.final_project.dto.PositionDto;
import ua.danit.final_project.services.crud.PositionService;

import java.util.List;

@RestController
@RequestMapping("/position")
public class PositionController {

  private final PositionService positionService;

  @Autowired
  public PositionController(PositionService positionService) {
    this.positionService = positionService;
  }

  @GetMapping
  public List<PositionDto> getPermittedForComments() {
    return positionService.getAllPinnedToComment();
  }

  @GetMapping("/list")
  public List<PositionDto> getPositions() {
    return positionService.getAll();
  }
}
