using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace AnimeCatalogApi.Models;

public class Rate
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string? Id { get; set; }

    [BsonElement("anime_id")]
    [BsonRepresentation(BsonType.ObjectId)]
    public string? AnimeId { get; set; }

    [BsonElement("anime_name")]
    public string? AnimeName { get; set; }

    [BsonElement("date")]
    public DateTime Date { get; set; }

    [BsonElement("rate")]
    public int RateNum { get; set; }


}