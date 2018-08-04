package ua.danit.final_project.entities;


import lombok.Data;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Table(name = "comment")
@Data
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "u_id", nullable = false)
    private User user;

    @Column(name = "c_message", nullable = false)
    private String message;

    @Column(name = "c_date", nullable = false)
    private Timestamp date;


}




