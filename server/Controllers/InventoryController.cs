using Bogus;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Models;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InventoryController : ControllerBase
    {
        private readonly InventoryContext _context;

        public InventoryController(InventoryContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetInventories([FromQuery] Dictionary<string, string> query)
        {
            const int inventoriesPerPage = 20;
            if (!query.Any())
            {
                List<Inventory> inventories = await _context.Inventories
                    .OrderBy(i => i.Name)
                    .Take(inventoriesPerPage)
                    .ToListAsync();
                int amount = await _context.Inventories.CountAsync();
                int pagesAmount = amount / inventoriesPerPage;
                if (amount % inventoriesPerPage > 0)
                    pagesAmount++;
                
                return Ok(new { inventories, amount, pagesAmount});
            }
            else
            {
                int page;
                if (query.ContainsKey("page"))
                    page = int.Parse(query["page"]);
                else
                    page = 1;
                List<Inventory> inventories = await _context.Inventories
                    .OrderBy(i => i.Name)
                    .ToListAsync();
                if (query.ContainsKey("location"))
                    inventories = inventories
                        .Where(i => i.Location == query["location"])
                        .ToList();
                
                if (query.ContainsKey("name"))
                    inventories = inventories
                        .Where(i => i.Name == query["name"])
                        .ToList();
                
                if (query.ContainsKey("orderBy"))
                    switch (query["orderBy"])
                    {
                        case "name":
                            inventories = inventories
                                .OrderBy(result => result.Name)
                                .ToList();
                            break;
                        case "price":
                            inventories = inventories
                                .OrderBy(result => result.Price)
                                .ToList();
                            break;
                    }
                
                if (query.ContainsKey("orderType") && query["orderType"] == "desc")
                    inventories.Reverse();

                int amount = inventories.Count;
                inventories = inventories
                    .Skip(inventoriesPerPage * (page - 1))
                    .Take(inventoriesPerPage)
                    .ToList();
                int pagesAmount = amount / inventoriesPerPage;
                if (amount % inventoriesPerPage > 0)
                    pagesAmount++;
                return Ok(new { inventories, amount, pagesAmount});
            }


        }
        [HttpPost]
        public async Task<IActionResult> AddInventory(AddInventoryRequest addInventoryRequest)
        {
            Inventory inventory = new Inventory()
            {
                Name = addInventoryRequest.Name,
                Location = addInventoryRequest.Location,
                Price = addInventoryRequest.Price
            };
            await _context.Inventories.AddAsync(inventory);
            await _context.SaveChangesAsync();
            return Ok(inventory);
        }

        [HttpDelete]
        [Route("{id:int}")]
        public async Task<IActionResult> DeleteInventory([FromRoute] int id)
        {
            Inventory? inventory = await _context.Inventories.FindAsync(id);
			
            if (inventory == null)
            {
                return BadRequest("Inventory doesn't exist!");
            }
            else
            {
                _context.Remove(inventory);
                await _context.SaveChangesAsync();
                return Ok(inventory);
            }

        }
        [HttpPost]
        [Route("test")]
        public async Task<IActionResult> InsertDummyInventories (int numInventories)
        {
            Faker faker = new Faker();
            Random random = new Random();
            List<Inventory> inventories = new List<Inventory>(numInventories);
            string[] locations = {
                "მთავარი ოფისი", "კავეა სითი მოლი",
                "კავეა გალერეა", "კავეა ისთ ფოინთი",
                "კავეა თბილისი მოლი", faker.Address.City(),
                faker.Address.City(), faker.Address.City(),
                faker.Address.City(), faker.Address.City(),
                faker.Address.City(), faker.Address.City()
            };
            int locationsLength = locations.Length;

            for (int i = 0; i < numInventories;  i++)
            {

                Inventory inventory = new Inventory()
                {
                    Name = faker.Commerce.ProductName(),
                    Location = locations[random.Next(locationsLength)],
                    Price = (long)faker.Random.Decimal(1, 1000)
                };
                inventories.Add(inventory);
            }
            await _context.Inventories.AddRangeAsync(inventories);
            await _context.SaveChangesAsync();
            return Ok(numInventories);
        }


    }
}
