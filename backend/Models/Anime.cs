using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace AnimeCatalogApi.Models;


public class Anime
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string? Id { get; set; }

    [BsonElement("name")]
    public string Name { get; set; } = null!;

    [BsonElement("cover")]
    public string? CoverUrl { get; set; }

    [BsonElement("type")]
    public string? Type { get; set; }

    [BsonElement("episodes")]
    public string? Episodes { get; set; }

    [BsonElement("status")]
    public string? Status { get; set; }

    [BsonElement("year")]
    public DateTime Year { get; set; }

    [BsonElement("genre")]
    public List<string> Genres { get; set; } = new List<string>();

    [BsonElement("age_rating")]
    public string? AgeRating { get; set; }

    [BsonElement("other_names")]
    public List<string> OtherNames { get; set; } = new List<string>();

    [BsonElement("studio")]
    public string? Studio { get; set; }

    [BsonElement("rating")]
    public double Rating { get; set; }

    [BsonElement("rates_count")]
    public int RatesCount { get; set; }

    [BsonElement("description")]
    public int Description { get; set; }

    [BsonElement("negative_rev_count")]
    public int NegativeRevCount { get; set; }

    [BsonElement("positive_rev_count")]
    public int PositiveRevCount { get; set; }

    [BsonElement("neutral_rev_count")]
    public int NeutralRevCount { get; set; }

    [BsonElement("reviews")]

    public List<AnimeReview> reviews {get; set; } = null!;

}