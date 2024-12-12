using AnimeCatalogApi.Models;
using AnimeCatalogApi.Services;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
namespace AnimeCatalogApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UserController : ControllerBase
{
    private readonly UserService _userService;
    private readonly AnimeService _animeService;
    private readonly ReviewService _reviewService;

    public UserController(UserService userService, AnimeService animeService, ReviewService revService) {
        _userService = userService;
        _animeService = animeService;
        _reviewService = revService;
    }

    [HttpGet]
    public async Task<List<User>> Get(string login = "", string sort = "registred_date", string order = "-1", string role = "") =>
        await _userService.GetAsync(login, sort, order, role);

    [HttpGet("{id:length(24)}")]
    public async Task<ActionResult<User>> Get(string id)
    {
        var u = await _userService.GetAsync(id);

        if (u is null)
        {
            return NotFound();
        }

        return u;
    }

    //temporary, todo 
    [HttpPost("Auth")]
    public async Task<ActionResult<User>> Auth([FromBody] AuthReqUser user)
    {

        var u = await _userService.Auth(user);

        if (u is null)
        {
            return NotFound();
        }

        return u;
    }

    [HttpGet("History/{id:length(24)}")]
    public async Task<ActionResult<List<AccountLog>>> GetHistory(string id)
    {
        var u = await _userService.GetHistoryAsync(id);
        return u;
    }

    [HttpPost]
    public async Task<IActionResult> Post(User newUser)
    {
        await _userService.CreateAsync(newUser);

        return CreatedAtAction(nameof(Get), new { id = newUser.Id }, newUser);
    }

    [HttpPut("{id:length(24)}")]
    public async Task<IActionResult> Update(string id, User updatedUser)
    {
        var u = await _userService.GetAsync(id);

        if (u is null)
        {
            return NotFound();
        }

        updatedUser.Id = u.Id;

        await _userService.UpdateAsync(id, updatedUser);

        return NoContent();
    }

    [HttpPost("Rate/{id:length(24)}", Name = "RateAnime")]
    public async Task<IActionResult> Post(string id, Rate rate)
    {
        await _userService.AddRate(id, rate);
        await _animeService.RateAnimeAsync(rate);

        return NoContent();
    }

    [HttpPut("Rate/{id:length(24)}", Name = "ChangeRateAnime")]
    public async Task<IActionResult> Put(string id, Rate newrate)
    {
        var old_rate = await _userService.ChangeRate(id, newrate);
        await _animeService.ChangeRateAnimeAsync(newrate, old_rate.RateNum, id);
        await _reviewService.ChangeRate(newrate.AnimeId!, id, newrate.RateNum);
        return NoContent();
    }

    [HttpDelete("{id:length(24)}")]
    public async Task<IActionResult> Delete(string id)
    {
        var u = await _userService.GetAsync(id);

        if (u is null)
        {
            return NotFound();
        }

        await _userService.RemoveAsync(id);

        return NoContent();
    }
}