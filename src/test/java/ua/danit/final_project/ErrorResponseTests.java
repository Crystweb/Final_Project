package ua.danit.final_project;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.HttpServerErrorException;
import org.springframework.web.client.RestTemplate;
import ua.danit.final_project.controllers.LocationController;
import ua.danit.final_project.entities.Location;

import javax.persistence.EntityNotFoundException;
import java.util.List;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class ErrorResponseTests {

  private RestTemplate template = new RestTemplate();

  @LocalServerPort
  int port;

  @MockBean
  LocationController locationController;

  @Before
  public void initMock() {
    Mockito.when(locationController.getLocations())
        .thenThrow(EntityNotFoundException.class);

    Mockito.when(locationController.getMainLocations())
        .thenThrow(NullPointerException.class);
  }

  @Test(expected = HttpClientErrorException.class)
  public void clientErrorResponseSent() {
        template.exchange("http://localhost:" + port + "/location",
            HttpMethod.GET,
            null,
            new ParameterizedTypeReference<List<Location>>(){});
  }

  @Test(expected = HttpServerErrorException.class)
  public void serverErrorResponseSent() {
    template.exchange("http://localhost:" + port + "/location/main",
        HttpMethod.GET,
        null,
        new ParameterizedTypeReference<List<Location>>(){});
  }
}
