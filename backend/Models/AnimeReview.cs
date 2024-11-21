using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace AnimeCatalogApi.Models;

public class AnimeReview
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string? Id { get; set; }

    [BsonElement("user_id")]
    [BsonRepresentation(BsonType.ObjectId)]
    public string? UserId { get; set; }

    [BsonElement("user_name")]
    public string? UserName { get; set; }

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