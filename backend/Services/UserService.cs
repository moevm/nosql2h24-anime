using AnimeCatalogApi.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using MongoDB.Bson;
using MongoDB.Bson.Serialization;

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

    public async Task<List<User>> GetAsync(string sort, string order, string role) =>
        await _userCollection.Find($"{{role: {{$regex: \"{role}\"}} }}").Sort($"{{ {sort}: {order} }}").ToListAsync();

    public async Task<User?> GetAsync(string id) =>
        await _userCollection.Find(x => x.Id == id).FirstOrDefaultAsync();
    
    //temporary, todo
    public async Task<User?> Auth(string name) =>
        await _userCollection.Find(x => x.Login == name).FirstOrDefaultAsync();

    public async Task<List<AccountLog>> GetHistoryAsync(string id) {
        var results = await _userCollection.Find(x => x.Id == id).FirstOrDefaultAsync();
        return results.AccountLogs;
    }
    
    public async Task CreateAsync(User newUser) =>
        await _userCollection.InsertOneAsync(newUser);

    public async Task UpdateAsync(string id, User updatedUser) =>
        await _userCollection.ReplaceOneAsync(x => x.Id == id, updatedUser);

    public async Task RemoveAsync(string id) =>
        await _userCollection.DeleteOneAsync(x => x.Id == id);
}