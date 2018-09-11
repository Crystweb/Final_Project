package ua.danit.final_project.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import ua.danit.final_project.entities.Schedule;
import ua.danit.final_project.services.ScheduleService;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/schedule")
public class ScheduleController {

  private final ScheduleService scheduleService;

  @Autowired
  public ScheduleController(ScheduleService scheduleService) {
    this.scheduleService = scheduleService;
  }

  @GetMapping
  public List<Schedule> getSchedule(@RequestParam(value = "date", required = false) Long millis) {
    if (millis == null) {
      millis = System.currentTimeMillis();
    }

    return scheduleService.findByDate(new Date(millis));
  }

  @PostMapping
  public Schedule addSchedule(@RequestBody Schedule schedule) {
    return scheduleService.create(schedule);
  }

  @PutMapping
  public Schedule updateSchedule(@RequestBody Schedule schedule) {
    return scheduleService.update(schedule);
  }

  @DeleteMapping
  public Schedule deleteSchedule(@RequestBody Schedule schedule) {
    return scheduleService.remove(schedule);
  }

  @DeleteMapping("/{id}")
  public Schedule deleteSchedule(@PathVariable("id") Long scheduleId) {
    return scheduleService.remove(scheduleId);
  }
}
