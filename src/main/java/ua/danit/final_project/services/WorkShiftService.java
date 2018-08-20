package ua.danit.final_project.services;

import ua.danit.final_project.entities.WorkShift;

import java.util.List;

public interface WorkShiftService {

  WorkShift getById(Long id);

  List<WorkShift> getAll();

  WorkShift save(WorkShift workShift);

  void deleteById(Long id);
}
