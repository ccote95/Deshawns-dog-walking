List<Dog> dogs = new List<Dog>{

        new() { Name = "Buddy", Id = 1, CityId = 1, WalkerId = 201 },
        new()  { Name = "Max", Id = 2, CityId = 2, WalkerId = 202 },
        new()  { Name = "Bailey", Id = 3, CityId = 3, WalkerId = 203 },
        new() { Name = "Charlie", Id = 4, CityId = 4, WalkerId = 204 },
       new()   { Name = "Lucy", Id = 5, CityId = 5, WalkerId = 205 },
       new() { Name = "Daisy", Id = 6, CityId = 6, WalkerId = 206 },

 };

List<City> cities = new List<City>{

       new() { Id = 1, Name = "New York" },
       new() { Id = 2, Name = "Los Angeles" },
       new()  { Id = 3, Name = "Chicago" },
        new() { Id = 4, Name = "Houston" },
        new() { Id = 5, Name = "Phoenix" },
        new() { Id = 6, Name = "Philadelphia" },


     };

List<Walker> walkers = new List<Walker>{


       new() { Id = 201, Name = "John" },
        new() { Id = 202, Name = "Emily" },
       new()  { Id = 203, Name = "Michael" },
       new()  { Id = 204, Name = "Sarah" },
        new() { Id = 205, Name = "David" },
        new()  { Id = 206, Name = "Jessica" },

         };






var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.MapGet("/api/hello", () =>
{
    return new { Message = "Welcome to DeShawn's Dog Walking" };
});


app.Run();
