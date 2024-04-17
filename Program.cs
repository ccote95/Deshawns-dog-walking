using DeShawnsDogWalking.Models;
using DeShawnsDogWalking.Models.DTOs;

List<Dog> dogs = new List<Dog>{

        new() { Name = "Buddy", Id = 1, CityId = 1, WalkerId = 1 },
        new()  { Name = "Max", Id = 2, CityId = 2, WalkerId = 2 },
        new()  { Name = "Bailey", Id = 3, CityId = 3, WalkerId = 3 },
        new() { Name = "Charlie", Id = 4, CityId = 4, WalkerId = 4 },
       new()   { Name = "Lucy", Id = 5, CityId = 5, WalkerId = 5 },
       new() { Name = "Daisy", Id = 6, CityId = 6, WalkerId = 6 },

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


       new() { Id = 1, Name = "John" },
        new() { Id = 2, Name = "Emily" },
       new()  { Id = 3, Name = "Michael" },
       new()  { Id = 4, Name = "Sarah" },
        new() { Id = 5, Name = "David" },
        new()  { Id = 6, Name = "Jessica" },

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

//to get all dogs
app.MapGet("/api/dog", () =>
{
    List<DogDTO> dogDTOs = new List<DogDTO>();
    foreach (Dog dog in dogs)
    {
        dogDTOs.Add(new DogDTO
        {
            Id = dog.Id,
            Name = dog.Name,
            CityId = dog.CityId,
            WalkerId = dog.WalkerId

        });
    }
    return dogDTOs;
});


app.MapGet("/api/dog/{id}", (int id) =>
{
    Dog dog = dogs.FirstOrDefault(d => d.Id == id);
    City city = cities.FirstOrDefault(c => c.Id == dog.CityId);
    Walker walker = walkers.FirstOrDefault(w => w.Id == dog.WalkerId);
    return new DogDTO
    {
        Id = dog.Id,
        Name = dog.Name,
        CityId = dog.CityId,
        City = new CityDTO
        {
            Id = city.Id,
            Name = city.Name
        },
        WalkerId = dog.WalkerId,
        Walker = new WalkerDTO
        {
            Id = walker.Id,
            Name = walker.Name
        }

    };
});

app.MapPost("/api/dog/create", (Dog dog) =>
{
    Walker walker = walkers.FirstOrDefault(w => w.Id == dog.WalkerId);
    City city = cities.FirstOrDefault(c => c.Id == dog.CityId);

    dog.Id = dogs.Max(d => d.Id) + 1;
    dogs.Add(dog);
    return Results.Created($"dog/{dog.Id}", new DogDTO
    {
        Id = dog.Id,
        WalkerId = dog.WalkerId,
        Walker = new WalkerDTO
        {
            Id = walker.Id,
            Name = walker.Name
        },
        CityId = dog.CityId,
        City = new CityDTO
        {
            Id = city.Id,
            Name = city.Name
        }
    });
});
app.Run();
