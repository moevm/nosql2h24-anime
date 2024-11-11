using AnimeCatalogApi.Models;
using AnimeCatalogApi.Services;
using MongoDB.Bson;
using MongoDB.Bson.Serialization;
using MongoDB.Driver;
var builder = WebApplication.CreateBuilder(args);
builder.Services.AddCors();
builder.Services.AddControllers();
// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.Configure<AnimeDatabaseSettings>(
    builder.Configuration.GetSection("AnimeCatalogDatabase"));
builder.Services.Configure<ReviewDatabaseSettings>(
    builder.Configuration.GetSection("AnimeCatalogDatabase"));
builder.Services.Configure<UserDatabaseSettings>(
    builder.Configuration.GetSection("AnimeCatalogDatabase"));
builder.Services.AddSingleton<AnimeService>();
builder.Services.AddSingleton<UserService>();
builder.Services.AddSingleton<ReviewService>();

//var client = new MongoClient("mongodb://username:password@database:27017");
//builder.Services.AddSingleton(client);

var app = builder.Build();
app.UseCors(builder => builder.WithOrigins("http://localhost:8000").AllowAnyHeader().AllowAnyMethod());

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.MapControllers();

app.Run();
