namespace ChineseOction.Models
{
    public class Purchase
    {
        public int Id { get; set; }
        public int CustomerId { get; set; }
        public User Customer{ get; set; }
        public DateTime Date { get; set; }
    }
}
