package ua.danit.final_project.services.crud;

import ua.danit.final_project.entities.Location;

import java.util.List;

public interface LocationService {

  Location getById(Long id);

  List<Location> getAll();

  Location save(Location location);

  void deleteById(Long id);

  List<Location> getMainLocations();
}
