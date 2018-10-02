package ua.danit.final_project.configuration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class SendMailServiceImpl implements SendMailService {

  private JavaMailSender javaMailSender;

  @Autowired
  public SendMailServiceImpl(JavaMailSender javaMailSender) {
    this.javaMailSender = javaMailSender;
  }

  @Override
  public void sendEmail(Map<String, String> mailInfo) {
    SimpleMailMessage email = new SimpleMailMessage();
    email.setTo(mailInfo.get("to"));
    email.setSubject(mailInfo.get("subject"));
    email.setText(mailInfo.get("text"));
    javaMailSender.send(email);
  }
}