#!/bin/bash

# Enhanced script that finds and captures the localhost editor window across all browsers

# Check if description is provided
if [ -z "$1" ]; then
    echo "Usage: ./scripts/smart-capture.sh <description>"
    exit 1
fi

# Create screenshots directory if it doesn't exist
mkdir -p screenshots

# Clean the description for filename
description=$(echo "$1" | tr ' ' '-' | tr '[:upper:]' '[:lower:]' | sed 's/[^a-z0-9-]//g')

# Generate timestamp
timestamp=$(date +"%Y%m%d_%H%M%S")
filename="screenshots/${timestamp}_${description}.png"

# Create a Python script to find and capture localhost window
python3 << 'PYTHON_SCRIPT' "$filename"
import subprocess
import sys
import time
import re

filename = sys.argv[1]

def run_applescript(script):
    """Run an AppleScript and return the output"""
    proc = subprocess.run(['osascript', '-e', script], capture_output=True, text=True)
    return proc.stdout.strip()

def find_localhost_window():
    """Find window with localhost in any browser"""
    browsers = ["Google Chrome", "Safari", "Arc", "Microsoft Edge", "Brave Browser", "Firefox"]
    
    for browser in browsers:
        # Check if browser is running
        check_script = f'tell application "System Events" to return exists application process "{browser}"'
        if run_applescript(check_script) == "true":
            print(f"Checking {browser}...")
            
            # Search for localhost tab
            search_script = f'''
            tell application "{browser}"
                set windowList to {{}}
                set windowCount to count of windows
                
                repeat with w from 1 to windowCount
                    set tabCount to count of tabs of window w
                    repeat with t from 1 to tabCount
                        try
                            set tabURL to URL of tab t of window w
                            if tabURL contains "localhost:" or tabURL contains "127.0.0.1:" then
                                -- Found localhost tab
                                set current tab of window w to tab t
                                set index of window w to 1
                                activate
                                delay 0.5
                                
                                -- Get window info for screenshot
                                set {{x1, y1, x2, y2}} to bounds of window 1
                                return (x1 as string) & "," & (y1 as string) & "," & ((x2 - x1) as string) & "," & ((y2 - y1) as string)
                            end if
                        end try
                    end repeat
                end repeat
                
                return "not found"
            end tell
            '''
            
            result = run_applescript(search_script)
            if result and result != "not found" and "," in result:
                return browser, result
    
    return None, None

# Find and capture localhost window
browser, bounds = find_localhost_window()

if bounds:
    print(f"\n✓ Found localhost window in {browser}")
    print(f"  Window bounds: {bounds}")
    
    # Take screenshot
    cmd = f'screencapture -R{bounds} "{filename}"'
    subprocess.run(cmd, shell=True)
    
    print(f"\n✓ Screenshot saved!")
else:
    print("\n✗ Could not find localhost window")
    print("\nPlease ensure:")
    print("1. The editor is open at http://localhost:4322/editor or http://localhost:4321/editor")
    print("2. The browser tab is not minimized")
    print("3. You're using a supported browser")

PYTHON_SCRIPT

# Check if screenshot was created
if [ -f "$filename" ]; then
    # Get file info
    size=$(ls -lh "$filename" | awk '{print $5}')
    dimensions=$(sips -g pixelHeight -g pixelWidth "$filename" | awk '/pixel/ {print $2}' | paste -sd "x" -)
    
    echo "  Filename: $filename"
    echo "  Size: $size"
    echo "  Dimensions: $dimensions"
    
    # Log entry
    echo "$(date '+%Y-%m-%d %H:%M:%S') - $description - $filename - $dimensions" >> screenshots/changelog.txt
else
    echo ""
    echo "If automatic capture failed, try manual mode:"
    echo "./scripts/capture-editor.sh '$1'"
fi