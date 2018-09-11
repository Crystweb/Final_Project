package ua.danit.final_project.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ua.danit.final_project.entities.Location;
import ua.danit.final_project.services.crud.LocationService;

import java.util.List;

@RestController
@RequestMapping("/location")
public class LocationController {

  private final LocationService locationService;

  @Autowired
  public LocationController(LocationService locationService) {
    this.locationService = locationService;
  }

  @GetMapping
  public List<Location> getLocations() {
    return locationService.getAll();
  }
}
