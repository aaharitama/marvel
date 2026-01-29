#!/bin/bash

# Script to push Marvel project to GitHub
# Make sure you have created a GitHub repository first

echo "Initializing git repository..."
git init

echo "Adding all files..."
git add .

echo "Making initial commit..."
git commit -m "Initial commit: Marvel Indonesia Teknologi company profile"

echo ""
echo "Next steps:"
echo "1. Create a new repository on GitHub (if you haven't already)"
echo "2. Copy the repository URL"
echo "3. Run: git remote add origin <your-repo-url>"
echo "4. Run: git branch -M main"
echo "5. Run: git push -u origin main"
echo ""
echo "Or if you already have a remote repository, run:"
echo "git remote add origin <your-repo-url>"
echo "git branch -M main"
echo "git push -u origin main"
