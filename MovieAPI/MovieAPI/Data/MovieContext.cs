using Microsoft.EntityFrameworkCore;
using MovieAPI.Models;
using System.Collections.Generic;

namespace MovieAPI.Data
{
    public class MovieContext : DbContext
    {
        public MovieContext(DbContextOptions<MovieContext> options) : base(options) { }

        public DbSet<Movie> Movies { get; set; }
    }
}
