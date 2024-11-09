namespace AnimeCatalogApi.Models;

public class AnimeDatabaseSettings{
    public string ConnectionString {get;set;} = null!;
    public string DatabaseName {get;set;} = null!;
    public string AnimeCollectionName {get;set;} = null!;

}