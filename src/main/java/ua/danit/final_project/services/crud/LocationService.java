package ua.danit.final_project.services.crud;

import ua.danit.final_project.dto.LocationDto;

import java.util.List;

public interface LocationService {

  LocationDto getById(Long id);

  List<LocationDto> getAll();

  LocationDto save(LocationDto location);

  void deleteById(Long id);

  List<LocationDto> getMainLocations();
}
