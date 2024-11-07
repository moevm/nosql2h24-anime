using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace AnimeCatalogApi.Models;

public class AnimeReview
{
    [BsonId]
    public ObjectId Id { get; set; }

    [BsonElement("user_id")]
    public ObjectId UserId { get; set; }

    [BsonElement("photo_mini")]
    public string? PhotoUrl { get; set; }

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