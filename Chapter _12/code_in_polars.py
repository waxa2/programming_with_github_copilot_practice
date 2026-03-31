import polars as pl

# Load a large CSV file
df = pl.read_csv('large_file.csv')

# Perform a groupby operation
grouped = df.groupby('column1').agg(pl.col('column2').sum())

# Sort the result
sorted_df = grouped.sort('column2', reverse=True)

# Display the result
print(sorted_df)