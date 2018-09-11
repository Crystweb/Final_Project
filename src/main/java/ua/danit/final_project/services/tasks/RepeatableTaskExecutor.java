package ua.danit.final_project.services.tasks;

import org.joda.time.DateTime;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import ua.danit.final_project.entities.Task;
import ua.danit.final_project.repositories.TaskRepository;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Service
@EnableScheduling
public class RepeatableTaskExecutor {

  private static final long UPDATE_PERIOD = 1000L * 60 * 5;

  private final Logger logger = LoggerFactory.getLogger(RepeatableTaskExecutor.class);

  private final TaskRepository taskRepository;
  private final Set<Task.TaskStatus> statusesToBeExpired;

  @Autowired
  public RepeatableTaskExecutor(TaskRepository taskRepository) {
    this.taskRepository = taskRepository;
    statusesToBeExpired = new HashSet<>();

    statusesToBeExpired.add(Task.TaskStatus.CHANGE);
    statusesToBeExpired.add(Task.TaskStatus.IN_PROGRESS);
    statusesToBeExpired.add(Task.TaskStatus.OPENED);
    statusesToBeExpired.add(Task.TaskStatus.PENDING);
  }

  @Scheduled(fixedRate = UPDATE_PERIOD)
  private void setExpired() {
    Date from = new Date(System.currentTimeMillis() - UPDATE_PERIOD);
    taskRepository.findAllByExpiredIsBetween(from, new Date())
        .stream()
        .filter(task -> statusesToBeExpired.contains(task.getStatus()))
        .forEach(task -> {
          task.setStatus(Task.TaskStatus.EXPIRED);
          taskRepository.save(task);
        });
  }

  @Scheduled(cron = "0 0 0 * * *") // every midnight
  private void processDailyTasks() {
    taskRepository.findAllByFrequencyAndStatusNot(Task.TaskFrequency.DAILY, Task.TaskStatus.REMOVED)
        .stream()
        .filter(t -> t.getExpired().before(new Date()))
        .filter(t -> t.getExpired().after(DateTime.now().minusDays(1).toDate()))
        .forEach(task -> {
          Task newTask = generateNewTask(task);
          newTask.setExpired(new DateTime(task.getExpired()).plusDays(1).toDate());

          taskRepository.save(newTask);
        });
    logger.info("New daily tasks are generated");
  }

  @Scheduled(cron = "0 0 0 * * 1") // every week
  private void processWeeklyTasks() {
    taskRepository.findAllByFrequencyAndStatusNot(Task.TaskFrequency.WEEKLY, Task.TaskStatus.REMOVED)
        .stream()
        .filter(t -> t.getExpired().before(new Date()))
        .filter(t -> t.getExpired().after(DateTime.now().minusWeeks(1).toDate()))
        .forEach(task -> {
          Task newTask = generateNewTask(task);
          newTask.setExpired(new DateTime(task.getExpired()).plusWeeks(1).toDate());

          taskRepository.save(newTask);
        });
    logger.info("New weekly tasks are generated");
  }

  @Scheduled(cron = "0 0 0 1 * *") // every month
  private void processMonthlyTasks() {
    taskRepository.findAllByFrequencyAndStatusNot(Task.TaskFrequency.MONTHLY, Task.TaskStatus.REMOVED)
        .stream()
        .filter(t -> t.getExpired().before(new Date()))
        .filter(t -> t.getExpired().after(DateTime.now().minusMonths(1).toDate()))
        .forEach(task -> {
          Task newTask = generateNewTask(task);
          newTask.setExpired(new DateTime(task.getExpired()).plusMonths(1).toDate());

          taskRepository.save(newTask);
        });
    logger.info("New monthly tasks are generated");
  }

  private Task generateNewTask(Task task) {
    Task copy = new Task();
    copy.setFrequency(task.getFrequency());
    copy.setStatus(Task.TaskStatus.OPENED);
    copy.setAssignee(task.getAssignee());
    copy.setDelegator(task.getDelegator());
    copy.setLocations(task.getLocations());
    copy.setMessage(task.getMessage());

    return copy;
  }
}
