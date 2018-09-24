package ua.danit.final_project.services.storage;

import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;

@Configuration
@PropertySource("classpath:aws.properties")
public class FileStorageProperties {

  @Value("${aws.credentials.key}")
  private String key;

  @Value("${aws.credentials.secret}")
  private String secret;

  @Bean
  public AmazonS3 getAmazonS3() {
    return AmazonS3ClientBuilder.standard()
        .withCredentials(new AWSStaticCredentialsProvider(
            new BasicAWSCredentials(key, secret)))
        .withRegion(Regions.EU_CENTRAL_1).build();
  }
}
