package ua.danit.final_project.configuration.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {

  private final CustomWebAuthenticationDetailsSource authenticationDetailsSource;

  private final UserDetailsService userDetailsService;
  private final CustomAuthenticationSuccessHandler successHandler;
  private final CustomAuthenticationProvider authenticationProvider;

  @Autowired
  public SecurityConfiguration(CustomWebAuthenticationDetailsSource authenticationDetailsSource,
                               @Qualifier("customUserDetailsService") UserDetailsService userDetailsService,
                               CustomAuthenticationSuccessHandler successHandler,
                               CustomAuthenticationProvider authenticationProvider) {
    this.authenticationDetailsSource = authenticationDetailsSource;

    this.userDetailsService = userDetailsService;
    this.successHandler = successHandler;
    this.authenticationProvider = authenticationProvider;
  }


  @Override
  protected void configure(HttpSecurity http) throws Exception {
    http
        .authorizeRequests()
        .antMatchers("/**").permitAll()
        .antMatchers(
            "/admin/**")
        .access("hasAnyRole('ROLE_ADMIN', 'ROLE_MODERATOR')")
        .antMatchers(
            "/client/**")
        .access("hasRole('ROLE_CLIENT')")
        .and()
        .formLogin()
        .loginPage("/login")
        .loginProcessingUrl("/sign-in")
        .authenticationDetailsSource(authenticationDetailsSource)
        .usernameParameter("login")
        .passwordParameter("password")
        .successHandler(successHandler)
        .failureHandler(new CustomAuthenticationFailureHandler())
        .and()
        .exceptionHandling()
        .accessDeniedPage("/403")
        .and().csrf().ignoringAntMatchers("/deposit/**")
        .and().csrf().ignoringAntMatchers("/bank/notify");

    http
        .logout()
        .logoutSuccessUrl("/")
        .deleteCookies("JSESSIONID");
  }

  @Bean
  public PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
  }

  @Bean
  public DaoAuthenticationProvider authenticationProvider() {
    authenticationProvider.setUserDetailsService(userDetailsService);
    authenticationProvider.setPasswordEncoder(passwordEncoder());
    return authenticationProvider;
  }

}

