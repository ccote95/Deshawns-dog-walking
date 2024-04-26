using DeShawnsDogWalking.Models;
using DeShawnsDogWalking.Models.DTOs;

List<Dog> dogs = new List<Dog>{

        new() { Name = "Buddy", Id = 1, CityId = 1, WalkerId = 1 },
        new()  { Name = "Max", Id = 2, CityId = 2, WalkerId = 2 },
        new()  { Name = "Bailey", Id = 3, CityId = 3, WalkerId = 3 },
        new() { Name = "Charlie", Id = 4, CityId = 4, WalkerId = 4 },
       new()   { Name = "Lucy", Id = 5, CityId = 5, WalkerId = 0 },
       new() { Name = "Daisy", Id = 6, CityId = 6, WalkerId = 6 },
       new() { Name = "bob", Id = 7, CityId = 6, WalkerId = 0 },

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

List<WalkerCity> walkerCities = new List<WalkerCity>{
    new() {Id = 1, CityId = 6, WalkerId = 1},
    new() {Id = 2, CityId = 1, WalkerId = 2},
    new() {Id = 3, CityId = 2, WalkerId = 3},
    new() {Id = 4, CityId = 3, WalkerId = 4},
    new() {Id = 5, CityId = 4, WalkerId = 5},
    new() {Id = 6, CityId = 5, WalkerId = 6},
    new() {Id = 7, CityId = 1, WalkerId = 1},

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
        Walker walker = walkers.FirstOrDefault(w => w.Id == dog.WalkerId);
        City city = cities.FirstOrDefault(c => c.Id == dog.CityId);
        dogDTOs.Add(new DogDTO
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
            Walker = walker == null ? new WalkerDTO { Id = 0, Name = "unassigned" } : new WalkerDTO
            {
                Id = walker.Id,
                Name = walker.Name,

            }

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
        City = cities.FirstOrDefault(c => c.Id == dog.CityId) == null ? null : new CityDTO
        {
            Id = city.Id,
            Name = city.Name
        },
        WalkerId = dog.WalkerId,
        Walker = walkers.FirstOrDefault(w => w.Id == dog.WalkerId) == null ? new WalkerDTO { Id = 0, Name = "unassigned" } : new WalkerDTO
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
        Walker = walkers.FirstOrDefault(w => w.Id == dog.WalkerId) == null ? null : new WalkerDTO
        {
            Id = walker.Id,
            Name = walker.Name
        },
        CityId = dog.CityId,
        City = cities.FirstOrDefault(c => c.Id == dog.CityId) == null ? null : new CityDTO
        {
            Id = city.Id,
            Name = city.Name
        }
    });
});

//gets all of the cities
app.MapGet("/api/city", () =>
{
    List<CityDTO> cityDTOs = new List<CityDTO>();
    foreach (City city in cities)
    {
        cityDTOs.Add(new CityDTO
        {
            Id = city.Id,
            Name = city.Name
        });
    }
    return cityDTOs;
});

app.MapGet("/api/walker", () =>
{

    List<WalkerDTO> walkerDTOs = new List<WalkerDTO>();
    foreach (Walker walker in walkers)
    {
        // finding the walkercity that are for that walker
        List<WalkerCity> walkerCitiesForWalkers = walkerCities.Where(wc => wc.WalkerId == walker.Id).ToList();


        walkerDTOs.Add(new WalkerDTO
        {
            Id = walker.Id,
            Name = walker.Name,
            WalkerCity = walkerCitiesForWalkers.Select(wc => new WalkerCityDTO
            {
                Id = wc.Id,
                CityId = wc.CityId,
                WalkerId = wc.WalkerId
            }).ToList()


        });
    }
    return walkerDTOs;
});

app.MapPut("/api/dog/assign", (Dog dog) =>
{
    Dog currentDog = dogs.FirstOrDefault(d => d.Id == dog.Id);
    currentDog.WalkerId = dog.WalkerId;
    return Results.Ok();


});

app.MapPost("/api/city/new", (City city) =>
{
    city.Id = cities.Max(c => c.Id) + 1;
    cities.Add(city);
    return Results.Created($"/api/city", new CityDTO
    {
        Id = city.Id,
        Name = city.Name
    });
});
// to get cities that match the walkerId
// need to iterate thru walkercity to find the walkerCity that matches that walkerId
app.MapGet("/api/walker/{id}", (int id) =>
{
    Walker walker = walkers.FirstOrDefault(w => w.Id == id);
    List<WalkerCity> walkerCititesForwalkers = walkerCities.Where(wc => wc.WalkerId == walker.Id).ToList();
    return new WalkerDTO
    {
        Id = walker.Id,
        Name = walker.Name,
        WalkerCity = walkerCititesForwalkers.Select(wc => new WalkerCityDTO
        {
            Id = wc.Id,
            CityId = wc.CityId,
            WalkerId = wc.WalkerId
        }).ToList()


    };
});


app.Run();