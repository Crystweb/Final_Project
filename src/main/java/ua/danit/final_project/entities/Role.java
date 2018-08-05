package ua.danit.final_project.entities;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.GenerationType;
import javax.persistence.Column;
import java.io.Serializable;

/**
 * Role - entity.
 */

@Entity
@Table(name = "role")
@Data
public class Role implements Serializable {

    /**
     * field id.
     */

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * field name.
     */

    @Column(name = "r_name", unique = true, nullable = false)
    private String name;
}
