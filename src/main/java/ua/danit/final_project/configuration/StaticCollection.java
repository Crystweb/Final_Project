package ua.danit.final_project.configuration;

import ua.danit.final_project.entities.User;

public class StaticCollection {

  private static User user;

  static {
    user = new User();
    user.setId(99L);
    user.setLogin("user_1");
    user.setPassword("pwd");
  }

  public static User getUser() {
    return user;
  }
}
