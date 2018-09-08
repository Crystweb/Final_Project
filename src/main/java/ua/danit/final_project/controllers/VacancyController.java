package ua.danit.final_project.controllers;
import org.springframework.web.bind.annotation.*;

import ua.danit.final_project.configuration.StaticCollection;
import ua.danit.final_project.dto.VacancyDto;
import ua.danit.final_project.entities.User;
import ua.danit.final_project.entities.Vacancy;
import ua.danit.final_project.services.crud.VacancyService;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/vacancy")
public class VacancyController {
    private final VacancyService vacancyService;
    private User user = StaticCollection.getUser();
    public VacancyController(VacancyService vacancyService) {
        this.vacancyService = vacancyService;
    }

    @GetMapping
    public List<VacancyDto> getVacanciesDto() {
        return vacancyService.getOpenVacancies()
                .stream()
                .map(vacancy -> new VacancyDto(vacancy))
                .collect(Collectors.toList());
    }

    @PostMapping
    public Vacancy createVacancy(@RequestBody Vacancy vacancy){
        vacancy.setUser(user);
        return  vacancyService.save(vacancy);
    }
}