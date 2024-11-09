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

    public async Task<List<Anime>> GetAsync(string name, string genres, string type, string status, 
    string ageRating, string sort, string order, string fromYear, string toYear){
        if(toYear == "")
            toYear = string.Format("{0}", DateTime.Now.Year + 2);
        if (genres == ""){
            return await _animeCollection.Find($"{{name: {{$regex: \"{name}\"}}, type: {{$regex: \"^{type}\"}}, status: {{$regex: \"^{status}\"}}, age_rating: {{$regex: \"{ageRating}$\"}}, year: {{$gte: \"{fromYear}\" , $lte: \"{toYear}\" }} }}")
            .Sort($"{{ {sort}: {order} }}")
            .ToListAsync();
        }
        else{
            var genres_f = "\"" + string.Join("\",\"", genres.Split(',')) + "\"";
            return await _animeCollection.Find($"{{genre: {{$all: [{genres_f}]}}, name: {{$regex: \"{name}\"}}, type: {{$regex: \"^{type}\"}}, status: {{$regex: \"^{status}\"}}, age_rating: {{$regex: \"{ageRating}$\"}}, year: {{$gte: \"{fromYear}\" , $lte: \"{toYear}\" }}  }}")
            .Sort($"{{ {sort}: {order} }}")
            .ToListAsync();
        }
    }

    public async Task<Anime?> GetAsyncById(string id) =>
        await _animeCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

    public async Task CreateAsync(Anime newAnime) =>
        await _animeCollection.InsertOneAsync(newAnime);

    //public async Task RateAnimeAsync(int rate){
       // return await _animeCollection.Aggregate()
   // }

    public async Task UpdateAsync(string id, Anime updatedAnime) =>
        await _animeCollection.ReplaceOneAsync(x => x.Id == id, updatedAnime);

    public async Task RemoveAsync(string id) =>
        await _animeCollection.DeleteOneAsync(x => x.Id == id);
}