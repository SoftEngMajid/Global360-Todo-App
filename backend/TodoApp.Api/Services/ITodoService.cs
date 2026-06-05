using TodoApp.Api.Models;

namespace TodoApp.Api.Services
{
    public interface ITodoService
    {
        IEnumerable<TodoItem> GetAll();
        TodoItem Add(TodoItem item);
        bool Delete(int id);
    }
}