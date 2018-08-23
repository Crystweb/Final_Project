package ua.danit.final_project.services.crud;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ua.danit.final_project.entities.BedLinenType;
import ua.danit.final_project.repositories.BedLinenTypeRepository;

import javax.persistence.EntityNotFoundException;
import java.util.List;

@Service
public class BedLinenTypeServiceImpl implements BedLinenTypeService{

  private final BedLinenTypeRepository bedLinenTypeRepository;

  @Autowired
  public BedLinenTypeServiceImpl(BedLinenTypeRepository bedLinenTypeRepository) {
    this.bedLinenTypeRepository = bedLinenTypeRepository;
  }

  @Override
  public BedLinenType getById(Long id) {
    return bedLinenTypeRepository.findById(id).orElseThrow(EntityNotFoundException::new);
  }

  @Override
  public List<BedLinenType> getAll() {
    return bedLinenTypeRepository.findAll();
  }

  @Override
  public BedLinenType save(BedLinenType bedLinenType) {
    return bedLinenTypeRepository.save(bedLinenType);
  }

  @Override
  public void deleteById(Long id) {
    bedLinenTypeRepository.deleteById(id);
  }
}
