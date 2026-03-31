/**
Feature: Two Sum
  As a user
  I want to find two numbers in an array that add up to a specific target number
  So that I can solve my problem

  Scenario: Find two numbers that add up to the target
    Given an array of integers
    And a target integer
    When I pass the array and target to the twoSum function
    Then it should return the indices of the two numbers that add up to the target
  **/

function twoSum(nums, target) {
  const numMap = {};
  for (let i = 0; i < nums.length; i++) {
    const num = nums[i];
    const complement = target - num;
    if (numMap[complement] !== undefined) {
      return [numMap[complement], i];
    }
    numMap[num] = i;
  }
  return [];
}