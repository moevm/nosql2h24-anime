using AnimeCatalogApi.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using MongoDB.Bson;
using MongoDB.Bson.Serialization;
using System.Text.RegularExpressions;

namespace AnimeCatalogApi.Services;

public class UserService
{
    private readonly IMongoCollection<User> _userCollection;

    public UserService(
        IOptions<UserDatabaseSettings> userDatabaseSettings)
    {
        var mongoClient = new MongoClient(
            userDatabaseSettings.Value.ConnectionString);

        var mongoDatabase = mongoClient.GetDatabase(
            userDatabaseSettings.Value.DatabaseName);

        _userCollection = mongoDatabase.GetCollection<User>(
            userDatabaseSettings.Value.UserCollectionName);
        if(_userCollection.CountDocuments("{}") == 0){
        string text = System.IO.File.ReadAllText("./test_data/anime_db_user.json");
        var document = BsonSerializer.Deserialize<List<User>>(text);
        _userCollection.InsertMany(document);
        }
    }

    public async Task<List<User>> GetAsync(string login, string sort, string order, string role, 
    string fromDate, string toDate, int minRates, int maxRates, int minReviews, int maxReviews){
        if(fromDate == "")
            fromDate = string.Format("{0}", DateTime.MinValue);
        if(toDate == "")
            toDate = string.Format("{0}", DateTime.Now);
        var filter = Builders<User>.Filter.And(
            Builders<User>.Filter.Regex(x => x.Role, new BsonRegularExpression(role)),
            Builders<User>.Filter.Regex(x => x.Login, new BsonRegularExpression(login, "i")),
            Builders<User>.Filter.AnyGte("registred_at", DateTime.Parse(fromDate)),
            Builders<User>.Filter.AnyLte("registred_at", DateTime.Parse(toDate)),
            Builders<User>.Filter.AnyGte("rates_count", minRates),
            Builders<User>.Filter.AnyLte("rates_count", maxRates),
            Builders<User>.Filter.AnyGte("reviews_count", minReviews),
            Builders<User>.Filter.AnyLte("reviews_count",maxReviews)
        );
        return await _userCollection.Find(filter).Sort($"{{ {sort}: {order} }}").ToListAsync();
    }

    public async Task<User?> GetAsync(string id) =>
        await _userCollection.Find(x => x.Id == id).FirstOrDefaultAsync();
    
    //temporary, todo
    public async Task<User?> Auth(AuthReqUser u) =>
        await _userCollection.Find(x => x.Login == u.Login && x.Password == u.Password).FirstOrDefaultAsync();

    public async Task<List<AccountLog>> GetHistoryAsync(string id) {
        var results = await _userCollection.Find(x => x.Id == id).FirstOrDefaultAsync();
        return results.AccountLogs;
    }
    
    public async Task CreateAsync(User newUser) =>
        await _userCollection.InsertOneAsync(newUser);

    public async Task AddRate(string id, Rate rate){
        rate.Id = ObjectId.GenerateNewId().ToString();
        var update = Builders<User>.Update.Push(e => e.Rates, rate);
        await _userCollection.UpdateOneAsync(e => e.Id == id, update);

        update =  Builders<User>.Update.Inc(e => e.RatesCount, 1);
        await _userCollection.UpdateOneAsync(e => e.Id == id, update);
    }
    public async Task<Rate> ChangeRate(string id, Rate newrate){
        newrate.Id = ObjectId.GenerateNewId().ToString();
        var filter = Builders<User>.Filter.And(
            Builders<User>.Filter.Eq("Id", id),
            Builders<User>.Filter.ElemMatch(e => e.Rates, o => o.AnimeId == newrate.AnimeId)
        );

        var update = Builders<User>.Update.Set(
            $"rates.$", newrate
        );

        var filter2 = Builders<User>.Filter.Eq(e => e.Id, id);
        var entity = await _userCollection.Find(filter2).FirstOrDefaultAsync();

        var subEntity = entity.Rates!.FirstOrDefault(se => se.AnimeId == newrate.AnimeId);
        
        await _userCollection.UpdateOneAsync(filter, update);
        return subEntity!;

    }

    public async Task IncReview(string id, int val){
        var update =  Builders<User>.Update.Inc(e => e.ReviewsCount, val);
        await _userCollection.UpdateOneAsync(e => e.Id == id, update);
    }

    public async Task UpdateAsync(string id, User updatedUser) =>
        await _userCollection.ReplaceOneAsync(x => x.Id == id, updatedUser);

    public async Task RemoveAsync(string id) =>
        await _userCollection.DeleteOneAsync(x => x.Id == id);
}