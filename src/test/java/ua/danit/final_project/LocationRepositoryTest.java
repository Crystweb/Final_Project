package ua.danit.final_project;

import org.junit.After;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;
import ua.danit.final_project.entities.Location;
import ua.danit.final_project.repositories.LocationRepository;

import java.util.List;

@RunWith(SpringRunner.class)
@ActiveProfiles("tests")
@SpringBootTest
public class LocationRepositoryTest {

  @Autowired
  LocationRepository locationRepository;

  private Location parent;
  private Location child;

  @Before
  public void addMocksToRepository() {
    parent = new Location();
    parent.setTitle("TestParentLoc");
    parent = locationRepository.save(parent);

    child = new Location();
    child.setTitle("TestChildLoc");


    child.setParentLocation(parent);
    child = locationRepository.save(child);
  }

  @After
  public void purge() {
    locationRepository.delete(child);
    locationRepository.delete(parent);
  }

  @Test
  public void mainLocationsFetched() {
    List<Location> locationsWithoutParent = locationRepository.findLocationsWithoutParent();
    Assert.assertNotNull(locationsWithoutParent);

    Location locationWithParent = locationsWithoutParent.stream()
        .filter(loc -> loc.getParentLocation() != null)
        .findAny()
        .orElse(null);

    Assert.assertEquals(1, locationsWithoutParent.size());
    Assert.assertNull(locationWithParent);
  }
}
