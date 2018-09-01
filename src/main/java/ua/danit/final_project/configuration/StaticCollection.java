package ua.danit.final_project.configuration;

import ua.danit.final_project.entities.User;

public class StaticCollection {

  private static User user;

  static {
    user = new User();
    user.setId(1L);
    user.setLogin("Artem");
    user.setPassword("pwd");
  }

  public static User getUser() {
    return user;
  }
}
