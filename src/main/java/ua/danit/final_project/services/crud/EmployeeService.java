package ua.danit.final_project.services.crud;

import org.springframework.web.multipart.MultipartFile;
import ua.danit.final_project.dto.EmployeeDto;
import ua.danit.final_project.entities.Employee;

import java.io.IOException;
import java.util.List;

public interface EmployeeService {

  Employee getById(Long id);

  List<EmployeeDto> getAll();

  EmployeeDto save(EmployeeDto employeeDto);

  EmployeeDto addImage(Employee employee, MultipartFile file) throws IOException;

  void deleteById(Long id);
}
