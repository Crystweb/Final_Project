package ua.danit.final_project.configuration;

import ua.danit.final_project.entities.Position;
import ua.danit.final_project.entities.User;

public class StaticCollection {

  private static User user;
  private static Position position;

  static {

    position = new Position();
    position.setTitle("admin");
    position.setId(1L);

    user = new User();
    user.setId(5L);
    user.setLogin("Artem");
    user.setPassword("pwd");
    user.setPosition(position);
  }

  public static User getUser() {
    return user;
  }

  public static Position getPosition() {
    return position;
  }
}
