package ua.danit.final_project.dto;

import org.mapstruct.AfterMapping;
import org.mapstruct.MappingTarget;
import org.springframework.stereotype.Component;
import ua.danit.final_project.entities.Location;

@Component
public class MapperHelper {

  @AfterMapping
  public void mapLocationParent(Location location, @MappingTarget LocationDto locationDto) {
    final Long parentId = location.getParentLocation() == null
        ? null
        : location.getParentLocation().getId();

    locationDto.setParentId(parentId);
  }
}
