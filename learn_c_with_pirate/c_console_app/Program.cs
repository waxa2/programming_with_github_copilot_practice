using System;

namespace c_console_app
{
    class Program
    {
        static void Main(string[] args)
        {
            Pirate jack = new Pirate("Jack Sparrow", 35, "Black Pearl");
            jack.Introduce();
        }
    }
}