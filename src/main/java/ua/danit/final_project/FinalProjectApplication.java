package ua.danit.final_project;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * start project.
 */

@SpringBootApplication
public  class FinalProjectApplication {

  /**
   * private constructor.
   */

  private FinalProjectApplication() {
  }

  /**
   * psvvm for start.
   * @param args .
   */

  public static void main(final String[] args) {
    SpringApplication.run(FinalProjectApplication.class, args);
  }
}
