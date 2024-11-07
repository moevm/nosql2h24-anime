using MongoDB.Bson;
using MongoDB.Bson.Serialization;
using MongoDB.Driver;
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
var client = new MongoClient("mongodb://username:password@database:27017");
builder.Services.AddSingleton(client);

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

var db = client.GetDatabase("animedb");
var collection = db.GetCollection<BsonDocument>("user");
if(await collection.CountDocumentsAsync("{}") == 0){
    string text = System.IO.File.ReadAllText("./test_data/anime_db_user.json");
    var document = BsonSerializer.Deserialize<List<BsonDocument>>(text);
    await collection.InsertManyAsync(document);
}

collection = db.GetCollection<BsonDocument>("anime");
if(await collection.CountDocumentsAsync("{}") == 0){
    string text = System.IO.File.ReadAllText("./test_data/anime_db_anime.json");
    var document = BsonSerializer.Deserialize<List<BsonDocument>>(text);
    await collection.InsertManyAsync(document);
}

collection = db.GetCollection<BsonDocument>("review");
if(await collection.CountDocumentsAsync("{}") == 0){
    string text = System.IO.File.ReadAllText("./test_data/anime_db_review.json");
    var document = BsonSerializer.Deserialize<List<BsonDocument>>(text);
    await collection.InsertManyAsync(document);
}

app.Run();
