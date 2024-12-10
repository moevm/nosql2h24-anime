using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace AnimeCatalogApi.Models;

public enum LogType{
    create,
    rename,
    rate,
    review
}
public class AccountLog
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string? Id { get; set; }

    [BsonElement("type")]
    public LogType type { get; set; }

    [BsonElement("date")]
    public DateTime Date { get; set; }

    [BsonElement("description")]
    public string? Description { get; set; }


}