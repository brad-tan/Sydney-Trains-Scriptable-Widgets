# Scriptable Sydney Trains Departures Widget

This Scriptable widget provides real-time train departure information for Green Square (to City) and St James (to Airport) stations in Sydney, Australia. It dynamically determines the closest station to your current location and displays upcoming departures tailored to that station.

<img width="253" alt="St James Example" src="https://github.com/brad-tan/Sydney-Trains-Scriptable-Widgets/assets/105221827/54e96610-957b-4a41-8081-425b5cbccc47">
<img width="253" alt="Green Square Example" src="https://github.com/brad-tan/Sydney-Trains-Scriptable-Widgets/assets/105221827/af60f924-5903-495e-a044-87c9bbbe1d1f">



**Features:**

* **Dynamic Station Selection:** Automatically detects the closest station (Green Square or St James) based on your location.
* **Tailored Departures:** Displays upcoming trains with destinations relevant to the selected station:
    * **Green Square:** Trains with destinations containing "City" or  "Central".
    * **St James:** Trains with destinations containing "Airport".
* **Departure Times:**  Shows primary and secondary (if available) departure times.
* **Clear Formatting:**  Presents information in a readable format with a clean design. 

**Requirements:**

* **Scriptable App:**  Available on the iOS App Store.
* **Location Access:**  The widget needs permission to access your location to determine the nearest station.
* **Transport for NSW API Key:**  A free API key is required, obtainable from https://api.transport.nsw.gov.au/ 

**Setup:**

1. **Install Scriptable:** Download the Scriptable app from the App Store.
2. **Obtain an API Key:**  Register for a free API key at https://api.transport.nsw.gov.au/ 
3. **Copy the Widget Code:**  Copy the entire JavaScript code provided below. 
4. **Create a New Script in Scriptable:**  
    * Open Scriptable and tap the "+" button.
    * Paste the copied code into the new script.
    * Replace the placeholder `"YOUR_API_KEY"`  with your actual API key.
5. **Run the Script:** Tap the "Play" button to test the widget.
6. **Add to Home Screen (Optional):**  For quick access:
    * Add a Scriptable widget on your home screen
    * Configure widget, make sure to select "Run Script" for quick viewing/widget updates
