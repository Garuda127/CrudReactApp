using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace CrudReactApp.Server.Models;

public partial class Contacto
{
    [Key]
    public int IdContacto { get; set; }

    public string? Nombre { get; set; }

    public string? Correo { get; set; }

    public string? Telefono { get; set; }
}
