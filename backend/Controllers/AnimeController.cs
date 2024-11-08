using AnimeCatalogApi.Models;
using AnimeCatalogApi.Services;
using Microsoft.AspNetCore.Mvc;

namespace AnimeCatalogApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AnimeController : ControllerBase
{
    private readonly AnimeService _animeService;

    public AnimeController(AnimeService animeService) =>
        _animeService = animeService;

    [HttpGet("")]
    public async Task<List<Anime>> Get(string name = "", string genres = "",
    string type = "", string status = "", string ageRating = "",
     string sort = "rating", string order = "-1", string fromYear = "", string toYear = "") =>
        await _animeService.GetAsync(name, genres, type, status, ageRating, sort, order, fromYear, toYear);

    [HttpGet("{id:length(24)}")]
    public async Task<ActionResult<Anime>> Get(string id)
    {
        var anime = await _animeService.GetAsyncById(id);

        if (anime is null)
        {
            return NotFound();
        }

        return anime;
    }

    [HttpPost]
    public async Task<IActionResult> Post(Anime newAnime)
    {
        await _animeService.CreateAsync(newAnime);

        return CreatedAtAction(nameof(Get), new { id = newAnime.Id }, newAnime);
    }

/*
    [HttpPut("Rate", Name = "RateAnime")]
    public async Task<IActionResult> Post(int rate, string user_id)
    {
        await _animeService.RateAnimeAsync(rate);

        return NoContent();
    }
*/
    [HttpPut("{id:length(24)}")]
    public async Task<IActionResult> Update(string id, Anime updatedAnime)
    {
        var anime = await _animeService.GetAsyncById(id);

        if (anime is null)
        {
            return NotFound();
        }

        updatedAnime.Id = anime.Id;

        await _animeService.UpdateAsync(id, updatedAnime);

        return NoContent();
    }

    [HttpDelete("{id:length(24)}")]
    public async Task<IActionResult> Delete(string id)
    {
        var anime = await _animeService.GetAsyncById(id);

        if (anime is null)
        {
            return NotFound();
        }

        await _animeService.RemoveAsync(id);

        return NoContent();
    }
}