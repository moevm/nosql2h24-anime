using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace AnimeCatalogApi.Models;

public enum ReccomendationType{
    Positive,
    Negative,
    Neutral
}

public class Review
{
    [BsonId]
    public ObjectId Id { get; set; }

    [BsonElement("user_id")]
    public ObjectId UserId { get; set; }

    [BsonElement("anime_id")]
    public ObjectId AnimeId { get; set; }

    [BsonElement("anime_name")]
    public string? AnimeName { get; set; }

    [BsonElement("anime_cover_mini")]
    public string CoverUrl { get; set; } = null!;

    [BsonElement("date")]
    public DateTime Date { get; set; }

    [BsonElement("rate")]
    public int Rate { get; set; }

    [BsonElement("text")]
    public string? Text { get; set; }

    [BsonElement("reccomendation")]
    [BsonRepresentation(BsonType.String)]
    public ReccomendationType? Reccomendation { get; set; }

}