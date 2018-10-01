package ua.danit.final_project.dto;

import org.mapstruct.Mapper;
import org.mapstruct.NullValueMappingStrategy;
import org.mapstruct.ReportingPolicy;
import ua.danit.final_project.entities.ShiftComment;

@Mapper(componentModel = "spring",
    uses = MapperHelper.class,
    nullValueMappingStrategy = NullValueMappingStrategy.RETURN_NULL,
    unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface DefaultMapper {

  ShiftCommentDto shiftCommentToShiftCommentDto(ShiftComment shiftComment);

  ShiftComment shiftCommentDtoToShiftComment(ShiftCommentDto shiftCommentDto);
}
