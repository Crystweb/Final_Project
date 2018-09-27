package ua.danit.final_project.configuration;

import java.util.Map;

public interface SendMailService {

  void sendEmail(Map<String, String> mailInfo);
}
