package ua.danit.final_project.controllers;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ua.danit.final_project.entities.Vacancy;
import ua.danit.final_project.services.VacancyService;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/vacancy")
public class VacancyController {

  private final VacancyService vacancyService;

  public VacancyController(VacancyService vacancyService) {
    this.vacancyService = vacancyService;
  }

  @GetMapping
  public List<Vacancy> getVacancies() {
    return vacancyService.findAll();
  }

  @PostMapping
  public Vacancy createVacancy(@RequestBody Vacancy vacancy) {
    return vacancyService.create(vacancy.getPosition(), vacancy.getSalary(), System.currentTimeMillis());
  }
}
