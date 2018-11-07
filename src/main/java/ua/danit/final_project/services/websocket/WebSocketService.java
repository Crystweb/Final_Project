package ua.danit.final_project.services.websocket;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import ua.danit.final_project.configuration.SessionAware;
import ua.danit.final_project.dto.ShiftCommentDto;
import ua.danit.final_project.dto.TaskDto;

@Service
public class WebSocketService extends SessionAware  {

  private static final String EVENTS_TASK = "/events/task";
  private static final String EVENTS_WORKSHIFT_COMMENT = "/events/comment";

  private final SimpMessagingTemplate template;
  private final ObjectMapper mapper;

  @Autowired
  public WebSocketService(SimpMessagingTemplate template,
                          ObjectMapper mapper) {
    this.template = template;
    this.mapper = mapper;
  }

  public void updateTask(TaskDto taskDto) throws JsonProcessingException {
    template.convertAndSend(EVENTS_TASK, mapper.writeValueAsString(taskDto));
  }

  public void updateComment(ShiftCommentDto shiftCommentDto) throws JsonProcessingException {
    template.convertAndSend(EVENTS_WORKSHIFT_COMMENT, mapper.writeValueAsString(shiftCommentDto));
  }
}
