package ua.danit.final_project;

import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.mockito.stubbing.Answer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;
import ua.danit.final_project.entities.Task;
import ua.danit.final_project.repositories.TaskRepository;
import ua.danit.final_project.services.tasks.TaskService;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static org.mockito.Mockito.any;

@RunWith(SpringRunner.class)
@SpringBootTest
public class TaskTests {

  private static long mockId = 0; // id counter to be set when mockRepository.save(obj) called

  @Autowired
  private TaskService taskService;

  @MockBean
  private TaskRepository mockTaskRepository;

  private Task task;

  @Before
  public void init() {
    task = new Task();

    Mockito.when(mockTaskRepository.save(any(Task.class)))
        .then((Answer<Task>) invocationOnMock -> {
            Task argument = invocationOnMock.getArgument(0);
            argument.setId(++mockId);
            return argument;
        });
    Mockito.when(mockTaskRepository.findById(any()))
        .thenReturn(Optional.of(task));
  }

  @Test
  public void taskCreated() throws IOException {
    Task newTask = taskService.create(task, null);

    Assert.assertNotNull(newTask);
    Assert.assertEquals(newTask.getMessage(), task.getMessage());
  }

  @Test
  public void taskExpiredOnRemoval() throws IOException {
    task = taskService.create(task, null);
    Task removedTask = taskService.remove(task.getId());

    Assert.assertEquals(removedTask.getStatus(), Task.TaskStatus.REMOVED);
  }

  @Test
  public void findActiveReturnsOnlyActive() {
    List<Task> allActive = taskService.findAllActive();
    List<Task> filtered = allActive.stream()
        .filter(t -> !t.getStatus().equals(Task.TaskStatus.CLOSED))
        .filter(t -> !t.getStatus().equals(Task.TaskStatus.REMOVED))
        .filter(t -> !t.getStatus().equals(Task.TaskStatus.REJECTED))
        .collect(Collectors.toList());

    Assert.assertEquals(allActive, filtered);
  }
}
