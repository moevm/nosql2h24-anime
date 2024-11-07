using AnimeCatalogApi.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using MongoDB.Bson;
using MongoDB.Bson.Serialization;

namespace AnimeCatalogApi.Services;

public class AnimeService
{
    private readonly IMongoCollection<Anime> _animeCollection;

    public AnimeService(
        IOptions<AnimeDatabaseSettings> animeDatabaseSettings)
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
    }

    public async Task<List<Anime>> GetAsync() =>
        await _animeCollection.Find(_ => true).ToListAsync();

    public async Task<Anime?> GetAsync(string id) =>
        await _animeCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

    public async Task CreateAsync(Anime newAnime) =>
        await _animeCollection.InsertOneAsync(newAnime);

    public async Task UpdateAsync(string id, Anime updatedAnime) =>
        await _animeCollection.ReplaceOneAsync(x => x.Id == id, updatedAnime);

    public async Task RemoveAsync(string id) =>
        await _animeCollection.DeleteOneAsync(x => x.Id == id);
}