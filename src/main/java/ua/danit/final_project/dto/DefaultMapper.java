package ua.danit.final_project.dto;

import org.mapstruct.Mapper;
import org.mapstruct.NullValueMappingStrategy;
import org.mapstruct.ReportingPolicy;
import ua.danit.final_project.entities.Location;

@Mapper(componentModel = "spring",
    nullValueMappingStrategy = NullValueMappingStrategy.RETURN_NULL,
    unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface DefaultMapper {

  LocationDto locationToLocationDto(Location location);
}
