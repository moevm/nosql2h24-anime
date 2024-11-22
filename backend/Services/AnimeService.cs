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
    string ageRating, string sort, string order, string fromYear, string toYear, string page = "1"){
        if(toYear == "")
            toYear = string.Format("{0}", DateTime.Now.Year + 2);
        var query = $"{{name: {{$regex: \"{name}\"}}";
        if (genres != ""){ 
            var genres_f = "\"" + string.Join("\",\"", genres.Split(',')) + "\"";
            query += $", genre: {{$all: [{genres_f}]}}";
        }
        if (type != ""){
            var types = "\"" + string.Join("\",\"", type.Split(',')) + "\"";
            query += $", type: {{$in: [{types}] }}";
        }
        if (status != ""){
            var statuses = "\"" + string.Join("\",\"", status.Split(',')) + "\"";
            query += $", status: {{$in: [{statuses}] }}";
        } 
        if (ageRating != ""){
            var ageRatings = "\"" + string.Join("\",\"", ageRating.Split(',')) + "\"";
            query += $", age_rating: {{$in: [{ageRatings}] }}";
        }  
        query += $", year: {{$gte: \"{fromYear}\" , $lte: \"{toYear}\" }} }}";

        int pages = -1;
        if (!string.IsNullOrEmpty(page) && int.TryParse(page, out var parsedPage))
    {
        pages = parsedPage - 1;
        
    }
        Console.WriteLine(pages);
        if (pages >= 0)
            return await _animeCollection.Find($"{query}").Sort($"{{ {sort}: {order} }}").Skip(3*pages).Limit(3).ToListAsync();
        else{
            return await _animeCollection.Find($"{query}").Sort($"{{ {sort}: {order} }}").ToListAsync();
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