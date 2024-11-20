namespace ChineseOction.Models
{
    public class Gift
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public float Price { get; set; }
        public string Picture { get; set; }
        public int CategoryId { get; set; }  
        public Category Category { get; set; }
        public int DonorId { get; set; }
        public Donor Donor { get; set; }
        //public int ?WinnerId { get; set; }
        //public Winner winner { get; set; }



    }
}
