package ua.danit.final_project.services.crud;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import ua.danit.final_project.dto.DefaultMapper;
import ua.danit.final_project.dto.EmployeeDto;
import ua.danit.final_project.entities.Employee;
import ua.danit.final_project.entities.EmployeeImage;
import ua.danit.final_project.repositories.EmployeeRepository;
import ua.danit.final_project.services.storage.StorageService;

import javax.persistence.EntityNotFoundException;
import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class EmployeeServiceImpl implements EmployeeService {

  private final EmployeeRepository employeeRepository;
  private final DefaultMapper mapper;
  private final StorageService storageService;

  @Autowired
  public EmployeeServiceImpl(EmployeeRepository employeeRepository,
                             DefaultMapper mapper,
                             StorageService storageService) {
    this.employeeRepository = employeeRepository;
    this.mapper = mapper;
    this.storageService = storageService;
  }

  @Override
  public Employee getById(Long id) {
    return employeeRepository.findById(id).orElseThrow(EntityNotFoundException::new);
  }

  @Override
  public List<EmployeeDto> getAll() {
    return employeeRepository.findAll()
        .stream()
        .map(mapper::employeeToEmployeeDto)
        .collect(Collectors.toList());
  }

  @Override
  public EmployeeDto save(EmployeeDto employeeDto) {
    Employee employee = mapper.employeeDtoToEmployee(employeeDto);
    employee = employeeRepository.save(employee);
    return mapper.employeeToEmployeeDto(employee);
  }

  @Override
  public EmployeeDto addImage(Employee employee, MultipartFile file) throws IOException {
    final EmployeeImage employeeImage = storageService.storeEmployeeImage(file, employee);
    employee.setEmployeeImage(employeeImage);

    return mapper.employeeToEmployeeDto(employee);
  }

  @Override
  public void deleteById(Long id) {
    employeeRepository.deleteById(id);
  }
}
