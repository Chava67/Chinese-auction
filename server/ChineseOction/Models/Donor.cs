using System.ComponentModel.DataAnnotations;

namespace ChineseOction.Models
{
    public class Donor
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Phone { get; set; }
        [EmailAddress]
        public string Mail { get; set; }
        public string Picture { get; set; }

        public IEnumerable<Gift> ?Gifts { get; set; } 
        public string FullName()
        {
            return FirstName + " " + LastName;
        }
    }
}
