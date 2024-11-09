using AnimeCatalogApi.Models;
using AnimeCatalogApi.Services;
using Microsoft.AspNetCore.Mvc;

namespace AnimeCatalogApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ReviewController : ControllerBase
{
    private readonly ReviewService _reviewService;

    public ReviewController(ReviewService revService) =>
        _reviewService = revService;

    [HttpGet]
    public async Task<List<Review>> Get() =>
        await _reviewService.GetAsync();

    [HttpGet("{id:length(24)}")]
    public async Task<ActionResult<Review>> Get(string id)
    {
        var rev = await _reviewService.GetAsync(id);

        if (rev is null)
        {
            return NotFound();
        }

        return rev;
    }

    [HttpGet("User/{id:length(24)}")]
    public async Task<ActionResult<List<Review>>> GetUserReviews(string id)
    {
        var rev = await _reviewService.GetAsyncByUserId(id);

        if (rev is null)
        {
            return NotFound();
        }

        return rev;
    }

    [HttpPost]
    public async Task<IActionResult> Post(Review newRev)
    {
        await _reviewService.CreateAsync(newRev);

        return CreatedAtAction(nameof(Get), new { id = newRev.Id }, newRev);
    }

    [HttpPut("{id:length(24)}")]
    public async Task<IActionResult> Update(string id, Review updatedRev)
    {
        var anime = await _reviewService.GetAsync(id);

        if (anime is null)
        {
            return NotFound();
        }

        updatedRev.Id = anime.Id;

        await _reviewService.UpdateAsync(id, updatedRev);

        return NoContent();
    }

    [HttpDelete("{id:length(24)}")]
    public async Task<IActionResult> Delete(string id)
    {
        var rev = await _reviewService.GetAsync(id);

        if (rev is null)
        {
            return NotFound();
        }

        await _reviewService.RemoveAsync(id);

        return NoContent();
    }
}