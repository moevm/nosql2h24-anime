using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace AnimeCatalogApi.Models;

    public class DatabaseData
    {
        public List<User> Users { get; set; }

        public List<Anime> Animes { get; set; }

        public List<Review> Reviews { get; set; }

    }
