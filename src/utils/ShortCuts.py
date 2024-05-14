import os

# Directory path
directory = './images'

# Iterate over each file in the directory
for filename in os.listdir(directory):
    # Print the filename
    print(filename)