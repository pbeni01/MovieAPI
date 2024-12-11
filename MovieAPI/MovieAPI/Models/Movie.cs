using System.ComponentModel.DataAnnotations;

namespace MovieAPI.Models
{
    public class Movie
    {
        [Key]
        public int Id { get; set; }
        [Required]
        [MaxLength(100)]
        public string Title { get; set; }
        [MaxLength(100)]
        public string Director { get; set; }
        [MaxLength(50)]
        public string Genre { get; set; }
        public int ReleaseYear { get; set; }
        [Range(1, 10)]
        public double Rating { get; set; }
    }
}
