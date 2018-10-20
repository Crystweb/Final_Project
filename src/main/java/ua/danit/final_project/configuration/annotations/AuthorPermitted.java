package ua.danit.final_project.configuration.annotations;

import ua.danit.final_project.entities.HasAuthor;
import ua.danit.final_project.entities.User;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
public @interface AuthorPermitted {

  long idToVerify() default 0L;
  long originalId() default 0L;
  long[] requiredPermissions() default 0L;
  Class<? extends HasAuthor> objectToVerify();
  Class<? extends User> methodCalledBy();
}
