using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ToDoAppBackend.Models
{

    public enum MoodType
    {
        Happy = 1,    
        Neutral = 2,  
        Sad = 3,      
        Excited = 4,  
        Tired = 5     
    }

    public class ToDoItem
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(100, MinimumLength = 3)]
        public string Title { get; set; }

        [MaxLength(500)]
        public string? Description { get; set; }

        public MoodType Mood { get; set; } = MoodType.Neutral;

        public bool IsCompleted { get; set; } = false;
        
        [Required]
        [DataType(DataType.Date)]
        public DateTime DueDate { get; set; }

        [NotMapped]
        public bool IsOverdue => DueDate < DateTime.Now;
    }

}