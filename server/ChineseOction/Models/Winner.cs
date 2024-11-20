namespace ChineseOction.Models
{
    public class Winner
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }
        public int GiftId { get; set; }
        public Gift Gift { get; set; }
        public DateTime DateWon { get; set; }

    }
}
