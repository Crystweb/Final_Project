package ua.danit.final_project.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ua.danit.final_project.configuration.SessionAware;
import ua.danit.final_project.dto.VacancyDto;
import ua.danit.final_project.entities.User;
import ua.danit.final_project.entities.Vacancy;
import ua.danit.final_project.services.crud.PositionService;
import ua.danit.final_project.services.crud.VacancyServiceCrud;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/vacancy")
public class VacancyController extends SessionAware {

  private final VacancyServiceCrud vacancyService;
  private final PositionService positionService;

  @Autowired
  public VacancyController(VacancyServiceCrud vacancyService, PositionService positionService) {
    this.vacancyService = vacancyService;
    this.positionService = positionService;
  }

  @GetMapping
  public List<VacancyDto> getVacanciesDto() {
    return vacancyService.getOpenVacancies()
            .stream()
            .map(VacancyDto::new)
            .collect(Collectors.toList());
  }

  @GetMapping("/{id}")
  public ResponseEntity<VacancyDto> getVacancyById(@PathVariable("id") Long id) {
    return ResponseEntity.ok(new VacancyDto(vacancyService.getById(id)));
  }

  @PostMapping
  public ResponseEntity<VacancyDto> createVacancy(@RequestBody VacancyDto vacancyDto) {
    User userFromToken = getCurrentUser();

    Vacancy vacancy = new Vacancy();

    vacancy.setVacancyStatus(Vacancy.VacancyStatus.OPENED);
    vacancy.setUser(userFromToken);
    vacancy.setPosition(positionService.getById(vacancyDto.getPositionId()));
    vacancy.setSalary(vacancyDto.getSalary());
    vacancy.setInfo(vacancyDto.getInfo());
    vacancy.setPublication(vacancyDto.getPublication());

    return ResponseEntity.ok(new VacancyDto(vacancyService.save(vacancy)));
  }

  @PutMapping
  public ResponseEntity<VacancyDto> updateVacancy(@RequestBody VacancyDto vacancyDto) {
    User userFromToken = getCurrentUser();

    Vacancy vacancy = new Vacancy();

    vacancy.setUser(userFromToken);
    vacancy.setPosition(vacancyService.createIfNotExist(vacancyService.getById(vacancyDto.getPositionId()).toString()));
    vacancy.setSalary(vacancyDto.getSalary());
    vacancy.setVacancyStatus(vacancyDto.getStatus());
    vacancy.setInfo(vacancyDto.getInfo());
    vacancy.setPublication(vacancyDto.getPublication());

    try {
      return ResponseEntity.ok(new VacancyDto(vacancyService.updateVacancy(vacancy, userFromToken)));
    } catch (IllegalAccessException e) {
      return  ResponseEntity.status(HttpStatus.FORBIDDEN).build();
    }
  }

  @DeleteMapping("/{id}")
  public ResponseEntity deleteVacancy(@PathVariable("id") Vacancy vacancy) {
    User userFromToken = getCurrentUser();

    try {
      vacancyService.deleteVacancy(vacancy, userFromToken);
      return ResponseEntity.ok().build();
    } catch (IllegalAccessException e) {
      return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
    }

  }
}
