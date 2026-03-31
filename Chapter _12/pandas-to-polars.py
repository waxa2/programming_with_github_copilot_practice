import pandas as pd

# Load a large CSV file
df = pd.read_csv('large_file.csv')

# Perform a groupby operation
grouped = df.groupby('column1').sum()

# Sort the result
sorted_df = grouped.sort_values('column2', ascending=False)

# Display the result
print(sorted_df)