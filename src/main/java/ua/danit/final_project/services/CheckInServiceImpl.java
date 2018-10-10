package ua.danit.final_project.services;

import org.joda.time.DateTime;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Service;
import ua.danit.final_project.configuration.SessionAware;
import ua.danit.final_project.entities.CheckIn;
import ua.danit.final_project.entities.Location;
import ua.danit.final_project.repositories.CheckInRepository;

import java.util.Date;
import java.util.List;

@Service
public class CheckInServiceImpl extends SessionAware implements CheckInService {

  private final CheckInRepository checkInRepository;

  @Autowired
  public CheckInServiceImpl(CheckInRepository checkInRepository) {
    this.checkInRepository = checkInRepository;
  }

  @Override
  public List<CheckIn> getCheckInsByDate(@Nullable Date date) {
    Date startOfADay;
    Date endOfADay;

    if (date == null) {
      startOfADay = DateTime.now().withTimeAtStartOfDay().toDate();
      endOfADay = DateTime.now().withTimeAtStartOfDay().plusDays(1).toDate();
    } else {
      startOfADay = new DateTime(date).withTimeAtStartOfDay().toDate();
      endOfADay = new DateTime(date).withTimeAtStartOfDay().plusDays(1).toDate();
    }
    return checkInRepository.findAllByCreatedBetween(startOfADay, endOfADay);
  }

  @Override
  public CheckIn save(CheckIn checkIn) {
    return checkInRepository.save(checkIn);
  }

  @Override
  public CheckIn save(Location location) {
    CheckIn checkIn = new CheckIn();
    checkIn.setEmployee(getEmployee());
    checkIn.setLocation(location);
    return save(checkIn);
  }
}
