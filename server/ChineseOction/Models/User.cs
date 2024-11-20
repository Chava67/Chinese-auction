using System.ComponentModel.DataAnnotations;

namespace ChineseOction.Models
{
    public enum Permission
    {
        MANAGER,
        CUSTOMER
    };
    public class User
    { 
        public int Id { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Phone { get; set; }
        [EmailAddress]
        public string Mail { get; set; }
        public Permission Permission { get; set; }
        public  IEnumerable <Purchase> ?Purchases { get; set; } 

    }
}
