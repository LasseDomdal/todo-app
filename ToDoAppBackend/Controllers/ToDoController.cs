using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using ToDoAppBackend.Data;
using ToDoAppBackend.Models;

namespace ToDoAppBackend.Controllers
{
    [Route("api/todo")]
    [ApiController]
    public class ToDoController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ToDoController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/todo
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ToDoItem>>> GetToDoItems()
        {
            return await _context.ToDoItems.ToListAsync();
        }

        // POST: api/todo
        [HttpPost]
        public async Task<ActionResult<ToDoItem>> CreateToDoItem(ToDoItem item)
        {
            _context.ToDoItems.Add(item);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetToDoItems), new { id = item.Id }, item);
        }

        // PUT: api/todo/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateToDoItem(int id, ToDoItem item)
        {
            if (id != item.Id)
            {
                return BadRequest();
            }

            _context.Entry(item).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        // DELETE: api/todo/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteToDoItem(int id)
        {
            var item = await _context.ToDoItems.FindAsync(id);
            if (item == null)
            {
                return NotFound();
            }

            _context.ToDoItems.Remove(item);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
