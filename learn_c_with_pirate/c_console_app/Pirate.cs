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
}