namespace server.Models
{
    public class AddInventoryRequest
    { 
        public string Name { get; set; } = string.Empty;
        public string Location { get; set; } = string.Empty;
        public long Price { get; set; }
    }
}
