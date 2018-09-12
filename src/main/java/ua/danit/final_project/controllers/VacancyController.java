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
import ua.danit.final_project.configuration.StaticCollection;
import ua.danit.final_project.dto.VacancyDto;
import ua.danit.final_project.entities.User;
import ua.danit.final_project.entities.Vacancy;
import ua.danit.final_project.services.crud.VacancyServiceCrud;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/vacancy")
public class VacancyController {

  private final VacancyServiceCrud vacancyService;
  private User user = StaticCollection.getUser();

  @Autowired
  public VacancyController(VacancyServiceCrud vacancyService) {
    this.vacancyService = vacancyService;
  }

  @GetMapping
  public List<VacancyDto> getVacanciesDto() {
    return vacancyService.getOpenVacancies()
            .stream()
            .map(VacancyDto::new)
            .collect(Collectors.toList());
  }

  @GetMapping("/{id}")
  public ResponseEntity<Vacancy> getVacancyById(@PathVariable("id") Long id) {
    return ResponseEntity.ok(vacancyService.getById(id));
  }

  @PostMapping
  public ResponseEntity<Vacancy> createVacancy(@RequestBody Vacancy vacancy) {
    vacancy.setUser(user);
    return ResponseEntity.ok(vacancyService.save(vacancy));
  }

  @PutMapping
  public ResponseEntity<Vacancy> updateVacancy(@RequestBody Vacancy vacancy) {
    User userFromToken = StaticCollection.getUser();

    try {
      return ResponseEntity.ok(vacancyService.updateVacancy(vacancy, userFromToken));
    } catch (IllegalAccessException e) {
      return  ResponseEntity.status(HttpStatus.FORBIDDEN).build();
    }
  }

  @DeleteMapping("/{id}")
  public ResponseEntity deleteVacancy( @PathVariable("id") Vacancy vacancy) {
    User userFromToken = StaticCollection.getUser();

    try {
      vacancyService.deleteVacancy(vacancy, userFromToken);
      return ResponseEntity.ok().build();
    } catch (IllegalAccessException e) {
      return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
    }

  }
}
