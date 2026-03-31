// .net console application to check if a string is a palindrome
// valid examples: racecar, taco, cat
using System;

namespace PalindromeChecker
{
	class Program
	{
		static void Main(string[] args)
		{
			Console.WriteLine("Enter a string to check if it's a palindrome:");
			string input = Console.ReadLine();

			if (IsPalindrome(input))
			{
				Console.WriteLine($"'{input}' is a palindrome.");
			}
			else
			{
				Console.WriteLine($"'{input}' is not a palindrome.");
			}
		}

		/// <summary>
		/// Determines whether the specified string is a palindrome.
		/// </summary>
		/// <param name="str">The input string to check for palindrome properties.</param>
		/// <returns>
		/// <c>true</c> if the input string is a palindrome; otherwise, <c>false</c>.
		/// </returns>
		/// <remarks>
		/// The method removes spaces and converts the string to lowercase to ensure uniformity
		/// before checking if the string reads the same backward as forward.
		/// </remarks>
		static bool IsPalindrome(string str)
		{
			// Remove spaces and convert to lowercase for uniformity
			string cleanedStr = str.Replace(" ", "").ToLower();
			char[] charArray = cleanedStr.ToCharArray();
			Array.Reverse(charArray);
			string reversedStr = new string(charArray);

			return cleanedStr == reversedStr;
		}
	}
}