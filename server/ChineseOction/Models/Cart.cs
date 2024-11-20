using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ChineseOction.Models
{
   
    public class Cart
    {
        public int Id { get; set; }

        public int GiftId { get; set; }

        public int UserId { get; set; }

        public int Quantity { get; set; }

        public Gift Gift { get; set; }
    }
}
