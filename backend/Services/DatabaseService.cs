using AnimeCatalogApi.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using MongoDB.Bson;
using MongoDB.Bson.Serialization;

namespace AnimeCatalogApi.Services;

public class DatabaseService
{
    private readonly IMongoCollection<Anime> _animeCollection;
    private readonly IMongoCollection<User> _userCollection;
    private readonly IMongoCollection<Review> _reviewCollection;

    public DatabaseService(
        IOptions<AnimeDatabaseSettings> animeDatabaseSettings,  IOptions<UserDatabaseSettings> userDatabaseSettings,
        IOptions<ReviewDatabaseSettings> reviewDatabaseSettings)
    {
        var mongoClient = new MongoClient(
            animeDatabaseSettings.Value.ConnectionString);

        var mongoDatabase = mongoClient.GetDatabase(
            animeDatabaseSettings.Value.DatabaseName);
        _animeCollection = mongoDatabase.GetCollection<Anime>(
            animeDatabaseSettings.Value.AnimeCollectionName);
        if(_animeCollection.CountDocuments("{}") == 0){
            string text = System.IO.File.ReadAllText("./test_data/anime_db_anime.json");
            var document = BsonSerializer.Deserialize<List<Anime>>(text);
            _animeCollection.InsertMany(document);
        }

        _userCollection = mongoDatabase.GetCollection<User>(
            userDatabaseSettings.Value.UserCollectionName);
        if(_userCollection.CountDocuments("{}") == 0){
        string text = System.IO.File.ReadAllText("./test_data/anime_db_user.json");
        var document = BsonSerializer.Deserialize<List<User>>(text);
        _userCollection.InsertMany(document);
        }

        _reviewCollection = mongoDatabase.GetCollection<Review>(
            reviewDatabaseSettings.Value.ReviewCollectionName);
        if(_reviewCollection.CountDocuments("{}") == 0){
        string text = System.IO.File.ReadAllText("./test_data/anime_db_review.json");
        var document = BsonSerializer.Deserialize<List<Review>>(text);
        _reviewCollection.InsertMany(document);
        }
    }

    public async Task Import(DatabaseData data)
        {
 
                if (data != null){
                    _animeCollection.DeleteMany("{}");
                    _userCollection.DeleteMany("{}");
                    _reviewCollection.DeleteMany("{}");

                    await _animeCollection.InsertManyAsync(data.Animes); 
                    await _userCollection.InsertManyAsync(data.Users); 
                    await _reviewCollection.InsertManyAsync(data.Reviews); 
                }
        }
        

    
     public async Task<DatabaseData> ExportData()
        {   
            DatabaseData data = new DatabaseData();
            data.Users = await _userCollection.Find(_ => true).ToListAsync();
            data.Animes = await _animeCollection.Find(_ => true).ToListAsync();
            data.Reviews = await _reviewCollection.Find(_ => true).ToListAsync();
            return data;
        }

}