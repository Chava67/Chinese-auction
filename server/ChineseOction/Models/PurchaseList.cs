namespace ChineseOction.Models
{
    public class PurchaseList
    {
        public int Id { get; set; }
        public Gift Gift { get; set; }
        public int GiftId { get; set; }
        public int PurchaseId { get; set; }
        public Purchase Purchase { get; set; }
        public int Quantity { get; set; }
    }
}
