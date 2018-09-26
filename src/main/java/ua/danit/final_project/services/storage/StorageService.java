package ua.danit.final_project.services.storage;

import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;
import ua.danit.final_project.entities.Task;

import java.io.IOException;

public interface StorageService {

  String storeFile(MultipartFile file, Task task) throws IOException;

  Resource loadFileAsResource(String fileName);

  // putObject
}
