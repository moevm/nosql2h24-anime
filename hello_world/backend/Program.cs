using MongoDB.Bson;
using MongoDB.Driver;
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddSingleton(new MongoClient("mongodb://username:password@database:27017"));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

var summaries = new[]
{
    "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
};

app.MapGet("/weatherforecast", () =>
{
    var forecast =  Enumerable.Range(1, 5).Select(index =>
        new WeatherForecast
        (
            DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
            Random.Shared.Next(-20, 55),
            summaries[Random.Shared.Next(summaries.Length)]
        ))
        .ToArray();
    return forecast;
})
.WithName("GetWeatherForecast")
.WithOpenApi();

app.MapGet("/test", async (MongoClient client) =>
{
    var db = client.GetDatabase("test");
    var collection = db.GetCollection<BsonDocument>("users");
    if(await collection.CountDocumentsAsync("{}") == 0){
        await collection.InsertManyAsync(new List<BsonDocument> {
            new BsonDocument{{"Name", "World"}, {"Age", "World"}},
            new BsonDocument{{"Name", "Hello"}, {"Age", "Mongo"}}
        });
    }
    var users = await collection.Find("{}").ToListAsync();
    return users.ToJson();
}).WithName("Test").WithOpenApi();

app.Run();

record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}
