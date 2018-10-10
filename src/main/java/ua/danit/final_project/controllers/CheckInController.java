package ua.danit.final_project.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import ua.danit.final_project.dto.CheckInDto;
import ua.danit.final_project.dto.DefaultMapper;
import ua.danit.final_project.entities.Location;
import ua.danit.final_project.services.CheckInService;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/check-in")
public class CheckInController {

  private final CheckInService checkInService;
  private final DefaultMapper mapper;

  @Autowired
  public CheckInController(CheckInService checkInService, DefaultMapper mapper) {
    this.checkInService = checkInService;
    this.mapper = mapper;
  }

  @GetMapping
  public List<CheckInDto> findByDate(@RequestParam(value = "date", required = false) Date date) {
    return checkInService.getCheckInsByDate(date)
        .stream()
        .map(mapper::checkInToCheckInDto)
        .collect(Collectors.toList());
  }

  @PostMapping("/{locId}")
  public CheckInDto checkIn(@PathVariable("locId") Location location) {
    return mapper.checkInToCheckInDto(checkInService.save(location));
  }
}
