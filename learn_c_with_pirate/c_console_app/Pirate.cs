using System;

namespace c_console_app
{
    class Program
    {
        static void Main(string[] args)
        {
            string name = null;
            int age = 0;
            string ship = null;

            for (int i = 0; i < args.Length; i++)
            {
                switch (args[i])
                {
                    case "--name":
                        name = args[++i];
                        break;
                    case "--age":
                        if (!int.TryParse(args[++i], out age))
                        {
                            Console.WriteLine("Error: Age must be a valid number.");
                            return;
                        }
                        break;
                    case "--ship":
                        ship = args[++i];
                        break;
                }
            }

            if (string.IsNullOrEmpty(name) || age == 0 || string.IsNullOrEmpty(ship))
            {
                Console.WriteLine("Usage: dotnet run -- --name <Name> --age <Age> --ship <Ship>");
                return;
            }

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