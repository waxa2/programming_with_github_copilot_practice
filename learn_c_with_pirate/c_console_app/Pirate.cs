using System;

namespace c_console_app
{
    class Program
    {
        static void Main(string[] args)
        {
            if (args.Length < 3)
            {
                Console.WriteLine("Usage: dotnet run <Name> <Age> <Ship>");
                return;
            }

            string name = args[0];
            if (!int.TryParse(args[1], out int age))
            {
                Console.WriteLine("Error: Age must be a valid number.");
                return;
            }
            string ship = args[2];

            Pirate pirate = new Pirate(name, age, ship);
            pirate.Introduce();
        }
    }

    class Pirate
    {
        public string Name { get; set; }
        public int Age { get; set; }
        public string Ship { get; set; }

        public Pirate(string name, int age, string ship)
        {
            Name = name;
            Age = age;
            Ship = ship;
        }

        public void Introduce()
        {
            Console.WriteLine($"Ahoy! My name is {Name}, I'm {Age} years old, and I sail on the {Ship}.");
        }
    }
}