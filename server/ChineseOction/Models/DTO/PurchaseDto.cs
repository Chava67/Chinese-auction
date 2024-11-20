namespace ChineseOction.Models
{
    public class PurchaseDto
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public int GiftId { get; set; }
        public bool Status { get; set; }
    }
}
