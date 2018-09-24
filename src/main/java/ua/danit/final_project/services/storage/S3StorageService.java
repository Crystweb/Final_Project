package ua.danit.final_project.services.storage;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import ua.danit.final_project.entities.Task;
import ua.danit.final_project.entities.TaskImage;
import ua.danit.final_project.repositories.TaskImageRepository;

import javax.validation.constraints.NotNull;
import java.io.IOException;
import java.io.InputStream;
import java.util.UUID;

@Service
@PropertySource("classpath:aws.properties")
public class S3StorageService implements StorageService {

  private final FileStorageProperties storageProperties;
  private final TaskImageRepository taskImageRepository;

  @Value("${aws.bucket}")
  private String bucket;

  @Autowired
  public S3StorageService(FileStorageProperties storageProperties,
                          TaskImageRepository taskImageRepository) {
    this.storageProperties = storageProperties;
    this.taskImageRepository = taskImageRepository;
  }


  @Override
  public String storeFile(@NotNull MultipartFile file, Task task) throws IOException {

    AmazonS3 s3 = storageProperties.getAmazonS3();

    String key = "taskPhotos/" + UUID.randomUUID();
    InputStream is = file.getInputStream();
    //    s3.putObject(bucket, key, is, new ObjectMetadata());
    s3.putObject(new PutObjectRequest(bucket, key, is, new ObjectMetadata())
        .withCannedAcl(CannedAccessControlList.PublicRead));

    String url = s3.getUrl(bucket, key).toString();

    TaskImage img = new TaskImage();
    img.setUrl(url);
    img.setAwsKey(key);
    img.setTask(task);

    taskImageRepository.save(img);

    return url;
  }

  @Override
  public Resource loadFileAsResource(String fileName) {
    return null;
  }

}
