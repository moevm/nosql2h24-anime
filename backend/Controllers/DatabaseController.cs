using AnimeCatalogApi.Models;
using AnimeCatalogApi.Services;
using Microsoft.AspNetCore.Mvc;

namespace AnimeCatalogApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class DatabaseController : ControllerBase
{
    
    private readonly DatabaseService _dbService;
    public DatabaseController(DatabaseService dbService){
        _dbService = dbService;
    }

    [HttpGet("export")]
    public async Task<IActionResult> ExportData()
    {
        DatabaseData data = await _dbService.ExportData();

        if (data == null)
        {
            return NotFound("No data found");
        }

        return Ok(data); // Отправляем данные в формате JSON
        }

    [HttpPost("import")]
    public async Task<IActionResult> Import(DatabaseData data)
    {
            
            if (data == null)
            {
                return BadRequest("Данные не были предоставлены.");
            }

            await _dbService.Import(data);

            return Ok(new { message = "Данные успешно получены!", data });
    }
}