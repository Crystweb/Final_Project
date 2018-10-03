package ua.danit.final_project.services.storage;

import org.springframework.web.multipart.MultipartFile;
import ua.danit.final_project.entities.Task;
import ua.danit.final_project.entities.TaskImage;

import java.io.IOException;

public interface StorageService {

  TaskImage storeTaskImage(MultipartFile file, Task task) throws IOException;

}
