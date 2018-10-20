package ua.danit.final_project.services.crud;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ua.danit.final_project.configuration.SessionAware;
import ua.danit.final_project.dto.DefaultMapper;
import ua.danit.final_project.dto.VacancyDto;
import ua.danit.final_project.entities.Vacancy;
import ua.danit.final_project.repositories.VacancyRepository;

import javax.persistence.EntityNotFoundException;
import java.sql.Timestamp;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class VacancyServiceCrudImpl extends SessionAware implements VacancyServiceCrud {
  private final VacancyRepository vacancyRepository;
  private final DefaultMapper mapper;

  @Autowired
  public VacancyServiceCrudImpl(VacancyRepository vacancyRepository,
                                DefaultMapper mapper) {
    this.vacancyRepository = vacancyRepository;
    this.mapper = mapper;
  }

  @Override
  public VacancyDto getById(Long id) {
    return vacancyRepository.findById(id)
        .map(mapper::vacancyToVacancyDto)
        .orElseThrow(EntityNotFoundException::new);
  }

  @Override
  public List<VacancyDto> getOpenVacancies() {
    return vacancyRepository.findAll().stream()
        .map(mapper::vacancyToVacancyDto)
        .collect(Collectors.toList());
  }

  @Override
  public VacancyDto create(VacancyDto vacancyDto) {
    vacancyDto.setPublication(new Timestamp(System.currentTimeMillis()));
    Vacancy vacancy = mapper.vacancyDtoToVacancy(vacancyDto);
    vacancy = vacancyRepository.save(vacancy);

    vacancy.setEmployee(getEmployee());

    return mapper.vacancyToVacancyDto(vacancy);
  }

  @Override
  public VacancyDto updateVacancy(VacancyDto vacancyDto) {
    Vacancy vacancy = mapper.vacancyDtoToVacancy(vacancyDto);
    vacancy = vacancyRepository.save(vacancy);
    return mapper.vacancyToVacancyDto(vacancy);
  }

  @Override
  public void deleteVacancy(Vacancy vacancy) {
    vacancyRepository.delete(vacancy);
  }
}
