package ua.danit.final_project.services.crud;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ua.danit.final_project.dto.DefaultMapper;
import ua.danit.final_project.dto.LocationDto;
import ua.danit.final_project.entities.Location;
import ua.danit.final_project.repositories.LocationRepository;

import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class LocationServiceImpl implements LocationService {

  private final LocationRepository locationRepository;
  private final DefaultMapper mapper;

  @Autowired
  public LocationServiceImpl(LocationRepository locationRepository,
                             DefaultMapper mapper) {
    this.locationRepository = locationRepository;
    this.mapper = mapper;
  }

  @Override
  public LocationDto getById(Long id) {
    return locationRepository.findById(id)
        .map(mapper::locationToLocationDto)
        .orElseThrow(EntityNotFoundException::new);
  }

  @Override
  public List<LocationDto> getAll() {
    return locationRepository.findAll()
        .stream()
        .map(mapper::locationToLocationDto)
        .collect(Collectors.toList());
  }

  @Override
  public LocationDto save(LocationDto locationDto) {
    Location location = mapper.locationDtoToLocation(locationDto);
    location = locationRepository.save(location);
    return mapper.locationToLocationDto(location);
  }

  @Override
  public void deleteById(Long id) {
    locationRepository.deleteById(id);
  }

  @Override
  public List<LocationDto> getMainLocations() {
    return locationRepository.findLocationsWithoutParent()
        .stream()
        .map(mapper::locationToLocationDto)
        .collect(Collectors.toList());
  }
}
