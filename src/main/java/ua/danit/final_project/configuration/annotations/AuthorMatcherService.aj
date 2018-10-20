package ua.danit.final_project.configuration.annotations;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.reflect.MethodSignature;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import ua.danit.final_project.entities.Employee;
import ua.danit.final_project.entities.HasAuthor;
import ua.danit.final_project.entities.User;

import java.lang.reflect.Method;
import java.util.Arrays;

@Aspect
@Order(Ordered.HIGHEST_PRECEDENCE)
@Component
public class AuthorMatcherService {

  @Around(value = "@annotation(AuthorPermitted)")
  public Object verifyAuthorities(ProceedingJoinPoint joinPoint) throws Throwable {
    final Employee author = Arrays.stream(joinPoint.getArgs())
        .filter(arg -> arg.getClass().isAssignableFrom(HasAuthor.class))
        .findFirst()
        .map(arg -> (HasAuthor) arg)
        .map(HasAuthor::getAuthor)
        .orElseThrow(IllegalArgumentException::new);

    final Employee whoCallsMethod = Arrays.stream(joinPoint.getArgs())
        .filter(arg -> arg.getClass().equals(User.class))
        .findFirst()
        .map(user -> (User) user)
        .map(User::getEmployee)
        .orElseThrow(IllegalArgumentException::new);

    if (author.equals(whoCallsMethod)) {
      return joinPoint.proceed();
    } else {
      throw new IllegalAccessException("Not permitted to invoke");
    }
  }

//  private long getIdToVerify(ProceedingJoinPoint joinPoint) {
//    final Method method = ((MethodSignature) joinPoint.getSignature()).getMethod();
//    final AuthorPermitted annotation = method.getAnnotation(AuthorPermitted.class);
//    return annotation.idToVerify();
//  }

  private long getIdToVerify(ProceedingJoinPoint joinPoint) {
    final Method method = ((MethodSignature) joinPoint.getSignature()).getMethod();
    final AuthorPermitted annotation = method.getAnnotation(AuthorPermitted.class);
    return annotation.idToVerify();
  }

  private long getOriginalId(ProceedingJoinPoint joinPoint) {
    final Method method = ((MethodSignature) joinPoint.getSignature()).getMethod();
    final AuthorPermitted annotation = method.getAnnotation(AuthorPermitted.class);
    return annotation.originalId();
  }
}
