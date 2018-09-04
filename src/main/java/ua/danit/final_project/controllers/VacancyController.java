package ua.danit.final_project.controllers;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import ua.danit.final_project.configuration.StaticCollection;
import ua.danit.final_project.entities.Position;
import ua.danit.final_project.entities.User;
import ua.danit.final_project.entities.Vacancy;
import ua.danit.final_project.services.crud.VacancyService;
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
        return vacancyService.getAll();
    }
    @PostMapping
    public Vacancy createVacancy(@RequestParam("user") User user,
                                 @RequestParam("position") Position position,
                                 @RequestParam("salary") Integer salary,
                                 @RequestParam("status") String status,
                                 @RequestParam("info") String info){
        StaticCollection.getUser();
        return vacancyService.save(user,position, salary, status, info, System.currentTimeMillis());
    }
}