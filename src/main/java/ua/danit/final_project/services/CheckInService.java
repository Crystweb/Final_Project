package ua.danit.final_project.services;

import org.springframework.lang.Nullable;
import ua.danit.final_project.entities.CheckIn;
import ua.danit.final_project.entities.Location;

import java.util.Date;
import java.util.List;

public interface CheckInService {

  List<CheckIn> getCheckInsByDate(@Nullable Date date);

  CheckIn save(CheckIn checkIn);
  
  CheckIn save(Location location);
}
