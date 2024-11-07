namespace AnimeCatalogApi.Models;

public class ReviewDatabaseSettings{
    public string ConnectionString {get;set;} = null!;
    public string DatabaseName {get;set;} = null!;
    public string ReviewCollectionName {get;set;} = null!;

}