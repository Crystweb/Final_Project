package ua.danit.final_project.dto;

import org.mapstruct.Mapper;
import org.mapstruct.NullValueMappingStrategy;
import org.mapstruct.ReportingPolicy;
import ua.danit.final_project.entities.Employee;
import ua.danit.final_project.entities.Location;
import ua.danit.final_project.entities.Position;
import ua.danit.final_project.entities.Role;
import ua.danit.final_project.entities.ShiftComment;
import ua.danit.final_project.entities.Task;
import ua.danit.final_project.entities.User;

@Mapper(componentModel = "spring",
    uses = MapperHelper.class,
    nullValueMappingStrategy = NullValueMappingStrategy.RETURN_NULL,
    unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface DefaultMapper {

  LocationDto locationToLocationDto(Location location);

  Location locationDtoToLocation(LocationDto locationDto);

  ShiftCommentDto shiftCommentToShiftCommentDto(ShiftComment shiftComment);

  ShiftComment shiftCommentDtoToShiftComment(ShiftCommentDto shiftCommentDto);

  PositionDto positionToPositionDto(Position position);

  Position positionDtoToPosition(PositionDto positionDto);

  EmployeeDto employeeToEmployeeDto(Employee employee);

  UserDto userToUserDto(User user);

  RoleDto roleToRoleDto(Role role);

  Employee employeeDtoToEmployee(EmployeeDto employeeDto);

  TaskDto taskToTaskDto(Task task);

  Task taskDtoToTask(TaskDto taskDto);
}
