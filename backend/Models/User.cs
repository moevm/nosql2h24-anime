using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace AnimeCatalogApi.Models;

public enum UserRole{
    admin,
    user
}

public class User
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string? Id { get; set; }

    [BsonElement("photo")]
    public string PhotoUrl { get; set; } = null!;

    [BsonElement("login")]
    public string? Login { get; set; }

    [BsonElement("email")]
    public string? Email { get; set; }

    [BsonElement("role")]
    [BsonRepresentation(BsonType.String)]
    public UserRole? Role { get; set; }

    [BsonElement("password")]
    public string? Password { get; set; }

    [BsonElement("registred_at")]
    public DateTime RegistrationDate { get; set; }

    [BsonElement("updated_at")]
    public DateTime UpdateDate { get; set; }

    [BsonElement("rates_count")]
    public int RatesCount { get; set; }

    [BsonElement("reviews_count")]
    public int ReviewsCount {get; set; }

    [BsonElement("rates")]
    
    public List<Rate>? Rates {get; set; } = null!;

    [BsonElement("account_logs")]

    public List<AccountLog> AccountLogs {get; set; } = null!;

}

public class AuthReqUser
{
    public string? Login { get; set; }
    public string? Password { get; set; }
}