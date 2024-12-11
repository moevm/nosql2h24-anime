using AnimeCatalogApi.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using MongoDB.Bson;
using MongoDB.Bson.Serialization;

namespace AnimeCatalogApi.Services;

public class ReviewService
{
    private readonly IMongoCollection<Review> _reviewCollection;

    public ReviewService(
        IOptions<ReviewDatabaseSettings> reviewDatabaseSettings)
    {
        var mongoClient = new MongoClient(
            reviewDatabaseSettings.Value.ConnectionString);

        var mongoDatabase = mongoClient.GetDatabase(
            reviewDatabaseSettings.Value.DatabaseName);

        _reviewCollection = mongoDatabase.GetCollection<Review>(
            reviewDatabaseSettings.Value.ReviewCollectionName);

        if(_reviewCollection.CountDocuments("{}") == 0){
        string text = System.IO.File.ReadAllText("./test_data/anime_db_review.json");
        var document = BsonSerializer.Deserialize<List<Review>>(text);
        _reviewCollection.InsertMany(document);
        }
    }

    public async Task<List<Review>> GetAsync() =>
        await _reviewCollection.Find(_ => true).ToListAsync();

    public async Task<List<Review>> GetAsyncByUserId(string id) =>
        await _reviewCollection.Find(x => x.UserId == id).ToListAsync();

    public async Task<Review?> GetAsync(string id) =>
        await _reviewCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

    public async Task<string?> CreateAsync(Review newReview){
        await _reviewCollection.InsertOneAsync(newReview);
        return newReview.Id;
    }

    public async Task UpdateAsync(string id, Review updatedReview) =>
        await _reviewCollection.ReplaceOneAsync(x => x.Id == id, updatedReview);

    public async Task RemoveAsync(string id) =>
        await _reviewCollection.DeleteOneAsync(x => x.Id == id);
}