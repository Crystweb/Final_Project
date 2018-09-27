package ua.danit.final_project.configuration;


import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.stereotype.Component;

import java.util.Properties;

@Component
public class MailConfig {

  @Value("${email.username}")
  private String userName;

  @Value("${email.password}")
  private String userPassword;

  @Bean
  public JavaMailSender getJavaMailSender() {
    JavaMailSenderImpl mailSender = new JavaMailSenderImpl();
    mailSender.setHost("smtp.gmail.com");
    mailSender.setPort(587);

    mailSender.setUsername(userName);
    mailSender.setPassword(userPassword);

    Properties props = mailSender.getJavaMailProperties();
    props.put("mail.protocol", "smtp");
    props.put("mail.smtp.auth", true);
    props.put("mail.smtp.starttls.enable", true);
    props.put("mail.debug", true);
    props.put("mail.smtp.ssl.trust", "*");

    return mailSender;
  }
}
