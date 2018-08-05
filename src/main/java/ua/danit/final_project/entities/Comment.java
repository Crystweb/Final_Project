/**
 * ua.danit.final_project.entities is a group.
 */
package ua.danit.final_project.entities;


import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.ManyToOne;
import javax.persistence.JoinColumn;
import javax.persistence.GenerationType;
import javax.persistence.FetchType;
import javax.persistence.Column;
import java.io.Serializable;
import java.sql.Timestamp;

/**
 * Comment - entity.
 */

@Entity
@Table(name = "comment")
@Data
public class Comment implements Serializable {

    /**
     * field id.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * field user.
     */

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "u_id", nullable = false)
    private User user;

    /**
     * field message.
     */
    @Column(name = "c_message", nullable = false)
    private String message;

    /**
     * field date.
     */
    @Column(name = "c_date", nullable = false)
    private Timestamp date;


}




