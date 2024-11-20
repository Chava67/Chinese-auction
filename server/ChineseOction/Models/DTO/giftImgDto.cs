namespace ChineseOction.Models.DTO
{
    public class giftImgDto
    {
        public string Name { get; set; }
        public float Price { get; set; }
        public int CategoryId { get; set; }
        public IFormFile Picture { get; set; }
        public int DonorId { get; set; }
    }
}
