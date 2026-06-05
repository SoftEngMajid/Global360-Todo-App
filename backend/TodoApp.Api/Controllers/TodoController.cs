using Microsoft.AspNetCore.Mvc;
using TodoApp.Api.Models;
using TodoApp.Api.Services;

namespace TodoApp.Api.Controllers
{
    // Handles all HTTP requests for our To-Do items.
    // Mapped to /api/todo automatically by the Route attribute.
    [ApiController]
    [Route("api/[controller]")]
    public class TodoController : ControllerBase
    {
        private readonly ITodoService _todoService;

        // Grab the service via Dependency Injection. 
        // This keeps things decoupled and makes unit testing way easier later on.
        public TodoController(ITodoService todoService)
        {
            _todoService = todoService;
        }

        // Grabs the full list of to-dos. 
        // TODO: We might need to add pagination here eventually if the list gets massive!
        [HttpGet]
        public IActionResult GetAllTodos()
        {
            var todos = _todoService.GetAll();
            return Ok(todos);
        }

        // Creates a brand new to-do item.
        [HttpPost]
        public IActionResult AddTodo([FromBody] TodoItem newItem)
        {
            // Just a quick sanity check in case the client sends empty data
            if (newItem == null)
            {
                return BadRequest("Make sure to provide a valid to-do item.");
            }

            var createdItem = _todoService.Add(newItem);
            
            // Return a 201 Created status and point them to the new resource location
            return CreatedAtAction(nameof(GetAllTodos), new { id = createdItem.Id }, createdItem);
        }

        // Wipes a to-do item from existence based on its ID.
        [HttpDelete("{id}")]
        public IActionResult DeleteTodo(int id)
        {
            var success = _todoService.Delete(id);
            
            // If it's already gone (or never existed in the first place), let them know
            if (!success) 
            {
                return NotFound();
            }
            
            // 204 No Content - operation was successful, but there's no data to send back
            return NoContent();
        }
    }
}