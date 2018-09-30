package ua.danit.final_project.dto;

import org.springframework.stereotype.Component;

@Component
public class MapperHelper {
  private final ContentRepository contentRepository;
  private final S3ObjectService s3ObjectService;

  @Value("${contentDelivery.baseUrl}")
  private String contentDeliveryBaseUrl;

  @Value("${contentDelivery.publicS3Link:false}")
  private boolean isReturnPublicS3Link;

  @Autowired
  public MapperHelper(@NonNull ContentRepository contentRepository,
                      @NonNull S3ObjectService s3ObjectService) {
    this.contentRepository = contentRepository;
    this.s3ObjectService = s3ObjectService;
  }

  @AfterMapping
  public void mapLink(AssetV1 asset, @MappingTarget AssetResponseV1 response) {
    final String link = isReturnPublicS3Link
        ? s3ObjectService.generateUrl(asset.getData().getObjectKey()).toString()
        : String.format(ASSET_V1_DOWNLOAD_FORMAT, contentDeliveryBaseUrl, asset.getId());

    response.setLink(link);
  }

  @AfterMapping
  public void mapUrl(FileMetadata fileMetadata, @MappingTarget FileMetadataResponse fileMetadataResponse) {
    final String url = isReturnPublicS3Link
        ? s3ObjectService.generateUrl(fileMetadata.getObjectKey()).toString()
        : String.format(ASSET_V2_DOWNLOAD_FORMAT, contentDeliveryBaseUrl, fileMetadata.getObjectKey());

    fileMetadataResponse.setUrl(url);
  }

  @AfterMapping
  public void addRelatedPublications(Publication publication,
                                     @MappingTarget PublicationResponse response,
                                     @Context MappingContext context) {
    if (Utils.isNotEmpty(publication.getLibraryIds())) {
      response.setRelatedPublications(publication.getLibraryIds().stream()
          .map(context.getRelatedPublications()::get)
          .flatMap(Collection::stream)
          .distinct()
          .filter(p -> !p.getId().equals(publication.getId())
              && Objects.equals(p.getState(), publication.getState().getCurrentState().asString()))
          .collect(Collectors.toList()));
    }
  }
}