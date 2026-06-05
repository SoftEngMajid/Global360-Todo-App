using TodoApp.Api.Services;

var builder = WebApplication.CreateBuilder(args);

// 1. Register Controllers so .NET can map the routes
builder.Services.AddControllers();

// 2. Dependency Injection: Register the service layer
builder.Services.AddSingleton<ITodoService, TodoService>();

// 3. Configure CORS so the Angular frontend can communicate with the API
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngular",
        policy => policy.WithOrigins("http://localhost:4200")
                        .AllowAnyHeader()
                        .AllowAnyMethod());
});

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Enable the CORS policy
app.UseCors("AllowAngular");

// Map controller endpoints to the routing engine
app.MapControllers();

app.Run();