package ua.danit.final_project.services.crud;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ua.danit.final_project.entities.WorkShift;
import ua.danit.final_project.repositories.WorkShiftRepository;

import javax.persistence.EntityNotFoundException;
import java.util.List;

@Service
public class WorkShiftServiceImpl implements WorkShiftService {

  private final WorkShiftRepository workShiftRepository;

  @Autowired
  public WorkShiftServiceImpl(WorkShiftRepository workShiftRepository) {
    this.workShiftRepository = workShiftRepository;
  }

  @Override
  public WorkShift getById(Long id) {
    return workShiftRepository.findById(id).orElseThrow(EntityNotFoundException::new);
  }

  @Override
  public List<WorkShift> getAll() {
    return workShiftRepository.findAll();
  }

  @Override
  public WorkShift save(WorkShift workShift) {
    return workShiftRepository.save(workShift);
  }

  @Override
  public void deleteById(Long id) {
    workShiftRepository.deleteById(id);
  }
}
