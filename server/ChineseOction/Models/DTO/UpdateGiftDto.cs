namespace ChineseOction.Models.DTO
{
    public class UpdateGiftDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public float Price { get; set; }
        public int CategoryId { get; set; }
        public int DonorId { get; set; }
        public string Picture { get; set; }
    }
}
