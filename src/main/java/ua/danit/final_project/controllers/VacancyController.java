package ua.danit.final_project.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import ua.danit.final_project.entities.Vacancy;
import ua.danit.final_project.services.VacancyService;

import java.util.List;

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
  public Vacancy createVacancy(@RequestParam("position") String position,
                                @RequestParam("salary") Integer salary) {
    return vacancyService.create(position, salary);
  }
}
