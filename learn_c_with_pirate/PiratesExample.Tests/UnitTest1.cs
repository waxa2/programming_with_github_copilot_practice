using Xunit;
using c_console_app;
using System;
using System.IO;

namespace PiratesExample.Tests
{
    public class PirateTests
    {
        [Fact]
        public void Pirate_Constructor_ShouldSetProperties()
        {
            // Arrange
            string name = "Jack Sparrow";
            int age = 35;
            string ship = "Black Pearl";

            // Act
            Pirate pirate = new Pirate(name, age, ship);

            // Assert
            Assert.Equal(name, pirate.Name);
            Assert.Equal(age, pirate.Age);
            Assert.Equal(ship, pirate.Ship);
        }

        [Fact]
        public void Pirate_Introduce_ShouldPrintCorrectMessage()
        {
            // Arrange
            Pirate pirate = new Pirate("Jack Sparrow", 35, "Black Pearl");
            string expectedOutput = "Ahoy! My name is Jack Sparrow, I'm 35 years old, and I sail on the Black Pearl.\n";

            // Act
            string output = CaptureConsoleOutput(() => pirate.Introduce());

            // Assert
            Assert.Equal(expectedOutput, output);
        }

        private string CaptureConsoleOutput(Action action)
        {
            using (var sw = new StringWriter())
            {
                Console.SetOut(sw);
                action();
                return sw.ToString();
            }
        }
    }
}
