package ua.danit.final_project.services.websocket;

import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Service;
import ua.danit.final_project.configuration.SessionAware;

@Service
public class WebSocketService extends SessionAware {

  private static final String WS_PATH = "/events";

  @SendTo(WS_PATH)
  public String updateTask(String json) {
    return json;
  }
}
