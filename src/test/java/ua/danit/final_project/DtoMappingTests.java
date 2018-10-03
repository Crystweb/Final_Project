package ua.danit.final_project;

import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import ua.danit.final_project.dto.DefaultMapper;
import ua.danit.final_project.dto.LocationDto;
import ua.danit.final_project.dto.PositionDto;
import ua.danit.final_project.dto.RoleDto;
import ua.danit.final_project.dto.TaskDto;
import ua.danit.final_project.entities.Location;
import ua.danit.final_project.entities.Position;
import ua.danit.final_project.entities.Role;
import ua.danit.final_project.entities.Task;
import ua.danit.final_project.entities.TaskComment;

import java.util.LinkedList;


@RunWith(SpringRunner.class)
@SpringBootTest
public class DtoMappingTests {

  @Autowired
  private DefaultMapper mapper;

  @Test
  public void LocationMappedToLocationDto() {
    Location location = new Location();
    location.setTitle("testLoc");
    LocationDto locationDto = mapper.locationToLocationDto(location);

    Assert.assertNotNull(locationDto);
    Assert.assertEquals(location.getTitle(), locationDto.getTitle());
  }

  @Test
  public void LocationDtoMappedToLocation() {
    LocationDto locationDto = new LocationDto();
    locationDto.setTitle("testLoc");
    Location location = mapper.locationDtoToLocation(locationDto);

    Assert.assertNotNull(location);
    Assert.assertEquals(locationDto.getTitle(), location.getTitle());
  }

  @Test
  public void RoleMappedToRoleDto() {
    Role role = new Role();
    role.setName("test");
    RoleDto roleDto = mapper.roleToRoleDto(role);

    Assert.assertEquals(role.getName(), roleDto.getName());
  }

  @Test
  public void PositionDtoMapped() {
    Position position = new Position();
    position.setTitle("testTitle");
    PositionDto positionDto = mapper.positionToPositionDto(position);
    Position doubleMappedPosition = mapper.positionDtoToPosition(positionDto);

    Assert.assertEquals(position.getTitle(), positionDto.getTitle());
    Assert.assertEquals(position, doubleMappedPosition);
  }

  @Test
  public void TaskDtoMapped() {
    Task task = new Task();
    task.setMessage("testTaskToDo");

    TaskDto taskDto = mapper.taskToTaskDto(task);
    Task doubleMappedTask = mapper.taskDtoToTask(taskDto);

    Assert.assertEquals(task.getMessage(), taskDto.getMessage());
    Assert.assertEquals(task, doubleMappedTask);
  }

  @Test
  public void TaskCommentMapped() {
    Task mockTask = new Task();
    mockTask.setId(1L);
    mockTask.setComments(new LinkedList<>());

    TaskComment taskComment = new TaskComment();
    taskComment.setMessage("hello, mock!");
    taskComment.setTask(mockTask);
    mockTask.getComments().add(taskComment);

    TaskDto taskDto = mapper.taskToTaskDto(mockTask);
    Task doubleMappedTask = mapper.taskDtoToTask(taskDto);
    String mappedMessage = taskDto.getComments().get(0).getMessage();

    Assert.assertEquals(taskComment.getMessage(), mappedMessage);
    Assert.assertEquals(mockTask.getComments(), doubleMappedTask.getComments());
  }
}
