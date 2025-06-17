#!/bin/bash

# Simple wrapper for capturing localhost editor screenshots
# This is the main script to use for UI development

# Check if description is provided
if [ -z "$1" ]; then
    echo "Usage: ./scripts/capture.sh <description>"
    echo "Example: ./scripts/capture.sh 'added-dark-mode'"
    exit 1
fi

# Use the localhost capture script
./scripts/capture-localhost.sh "$1"