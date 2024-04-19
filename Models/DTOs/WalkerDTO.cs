namespace DeShawnsDogWalking.Models.DTOs;

public class WalkerDTO
{
    public int Id { get; set; }
    public string Name { get; set; }
    public List<WalkerCityDTO> WalkerCity { get; set; }
}