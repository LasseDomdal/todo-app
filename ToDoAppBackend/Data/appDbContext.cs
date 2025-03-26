using Microsoft.EntityFrameworkCore;
using ToDoAppBackend.Models;

namespace ToDoAppBackend.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<ToDoItem> ToDoItems { get; set; }
    }
}
