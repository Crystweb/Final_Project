package ua.danit.final_project.services.crud;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ua.danit.final_project.entities.Location;
import ua.danit.final_project.repositories.LocationRepository;

import javax.persistence.EntityNotFoundException;
import java.util.List;

@Service
public class LocationServiceImpl implements LocationService {

  private final LocationRepository locationRepository;

  @Autowired
  public LocationServiceImpl(LocationRepository locationRepository) {
    this.locationRepository = locationRepository;
  }

  @Override
  public Location getById(Long id) {
    return locationRepository.findById(id).orElseThrow(EntityNotFoundException::new);
  }

  @Override
  public List<Location> getAll() {
    return locationRepository.findAll();
  }

  @Override
  public Location save(Location location) {
    return locationRepository.save(location);
  }

  @Override
  public void deleteById(Long id) {
    locationRepository.deleteById(id);
  }

  @Override
  public List<Location> getMainLocations() {
    return locationRepository.findLocationsWithoutParent();
  }
}
