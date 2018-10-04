package ua.danit.final_project.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ua.danit.final_project.dto.DefaultMapper;
import ua.danit.final_project.dto.LocationDto;
import ua.danit.final_project.services.crud.LocationService;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/location")
public class LocationController {

  private final LocationService locationService;
  private final DefaultMapper mapper;

  @Autowired
  public LocationController(LocationService locationService,
                            DefaultMapper mapper) {
    this.locationService = locationService;
    this.mapper = mapper;
  }

  @GetMapping
  public List<LocationDto> getLocations() {
    return locationService.getAll()
        .stream()
        .map(mapper::locationToLocationDto)
        .collect(Collectors.toList());
  }

  @GetMapping("/main")
  public List<LocationDto> getMainLocations() {
    return locationService.getMainLocations()
        .stream()
        .map(mapper::locationToLocationDto)
        .collect(Collectors.toList());
  }
}
