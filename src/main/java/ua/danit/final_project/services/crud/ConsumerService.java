package ua.danit.final_project.services.crud;

import ua.danit.final_project.entities.Consumer;

import java.util.List;

public interface ConsumerService {

  Consumer getById(Long id);

  List<Consumer> getAll();

  Consumer save(Consumer consumer);

  void deleteById(Long id);
}
