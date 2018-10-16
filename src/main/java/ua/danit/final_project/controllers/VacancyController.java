package ua.danit.final_project.controllers;

import org.springframework.beans.factory.annotation.Autowired;
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
import ua.danit.final_project.entities.Vacancy;
import ua.danit.final_project.services.crud.VacancyServiceCrud;

import java.util.List;

@RestController
@RequestMapping("/vacancy")
public class VacancyController extends SessionAware {

  private final VacancyServiceCrud vacancyService;

  @Autowired
  public VacancyController(VacancyServiceCrud vacancyService) {
    this.vacancyService = vacancyService;
  }

  @GetMapping
  public List<VacancyDto> getVacanciesDto() {
    return vacancyService.getOpenVacancies();
  }

  @PostMapping
  public VacancyDto createVacancy(@RequestBody VacancyDto vacancyDto) {
    return vacancyService.create(vacancyDto);
  }

  @PutMapping
  public VacancyDto updateVacancy(@RequestBody VacancyDto vacancyDto) {
    return vacancyService.updateVacancy(vacancyDto);
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<?> deleteVacancy(@PathVariable("id") Vacancy vacancy) {
    vacancyService.deleteVacancy(vacancy);
    return ResponseEntity.ok("Removed");
  }
}
