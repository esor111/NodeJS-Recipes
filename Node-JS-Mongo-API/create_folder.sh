#!/bin/bash

# Check if a folder name is provided as a parameter
if [ -z "$1" ]; then
  echo "Please provide a folder name as a parameter."
  exit 1
fi

# Use the provided folder name
folder_name="$1"

# Create the folder
mkdir "$folder_name"

# Provide feedback to the user
echo "Folder '$folder_name' created."
