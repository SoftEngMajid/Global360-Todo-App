using TodoApp.Api.Models;

namespace TodoApp.Api.Services
{
    public class TodoService : ITodoService
    {
        private static readonly List<TodoItem> _todoList = new();
        private static int _nextId = 1;

        public IEnumerable<TodoItem> GetAll()
        {
            return _todoList;
        }

        public TodoItem Add(TodoItem item)
        {
            item.Id = _nextId++;
            _todoList.Add(item);
            return item;
        }

        public bool Delete(int id)
        {
            var item = _todoList.FirstOrDefault(t => t.Id == id);
            if (item == null) return false;

            _todoList.Remove(item);
            return true;
        }
    }
}