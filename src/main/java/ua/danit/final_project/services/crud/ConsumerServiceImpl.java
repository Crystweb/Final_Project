package ua.danit.final_project.services.crud;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ua.danit.final_project.entities.Consumer;
import ua.danit.final_project.repositories.ConsumerRepository;

import javax.persistence.EntityNotFoundException;
import java.util.List;

@Service
public class ConsumerServiceImpl implements ConsumerService {

  private final ConsumerRepository consumerRepository;

  @Autowired
  public ConsumerServiceImpl(ConsumerRepository consumerRepository) {
    this.consumerRepository = consumerRepository;
  }

  @Override
  public Consumer getById(Long id) {
    return consumerRepository.findById(id).orElseThrow(EntityNotFoundException::new);
  }

  @Override
  public List<Consumer> getAll() {
    return consumerRepository.findAll();
  }

  @Override
  public Consumer save(Consumer consumer) {
    return consumerRepository.save(consumer);
  }

  @Override
  public void deleteById(Long id) {
    consumerRepository.deleteById(id);
  }
}
