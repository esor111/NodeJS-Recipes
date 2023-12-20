#!/bin/bash

# Check if a filename is provided as a parameter
if [ $# -eq 0 ]; then
  echo "Error: Please provide a filename as a parameter."
  exit 1
fi

# Get the filename from the command line parameter
file_name="$1"

# Get the current date and time
current_date=$(date +"%Y-%m-%d %H:%M:%S")

# Create the text file and write the current date to it
echo "Current Date: $current_date" > "$file_name"

# Provide feedback to the user
echo "Text file '$file_name' created with the current date."
