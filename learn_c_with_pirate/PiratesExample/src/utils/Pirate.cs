using System;

namespace c_console_app
{
    public class Pirate
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



