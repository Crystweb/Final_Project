package ua.danit.final_project.configuration.security;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.io.Serializable;

/**
 * Created by stephan on 20.03.16.
 */
@Data
@AllArgsConstructor
public class JwtAuthenticationRequest implements Serializable {

    private static final long serialVersionUID = -8445943548965154778L;

    private String userName;
    private String userPassword;

    public JwtAuthenticationRequest() {
        super();
    }

    }


