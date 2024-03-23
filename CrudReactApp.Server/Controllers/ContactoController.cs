using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using CrudReactApp.Server.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace CrudReactApp.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactoController : ControllerBase
    {
        private readonly ILogger<ContactoController> _logger;
        private readonly CrudReactMvcContext _context;

        public ContactoController(ILogger<ContactoController> logger, CrudReactMvcContext context)
        {
            _logger = logger;
            _context = context;
        }

        [HttpGet("lista")]
        public async Task<IActionResult> Lista()
        {
            var lista = await _context.Contactos.OrderByDescending(x => x.IdContacto).ToListAsync();
            return Ok(lista);
        }

        [HttpPost("guardar")]
        public async Task<IActionResult> Guardar([FromBody] Contacto request)
        {
            await _context.Contactos.AddAsync(request);
            await _context.SaveChangesAsync();
            return Created();
        }

        [HttpPut("/api/contacto/editar")]
        public async Task<IActionResult> Actualizar([FromBody] Contacto request)
        {
            _context.Contactos.Update(request);
            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpDelete("/api/contacto/eliminar/{id:int}")]
        public async Task<IActionResult> Eliminar(int id)
        {
            Console.WriteLine("Eliminando", id);
            var contacto = _context.Contactos.FirstOrDefault(x => x.IdContacto == id);
            if (contacto == null)
            {
                return NotFound();
            }
            else
            {
                _context.Contactos.Remove(contacto);
                await _context.SaveChangesAsync();
            }
            return Ok();
        }
    }
}
