// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: green; icon-glyph: magic;
let stationID = args.widgetParameter

let widget = await createWidget()

if (config.runsInWidget) {
 Script.setWidget(widget)
} else {
 widget.presentMedium()
}
Script.complete()

async function createWidget() {
 const trains = await fetchTrainTimes();

 if (!trains || trains.length === 0) { // Handle no train data
  let widget = new ListWidget();
  widget.addText("No train data found.");
  return widget;
 }

 // Create the widget 
 let widget = new ListWidget();
 widget.backgroundColor = new Color("#00954C"); 

 // Last Updated Time
 let updatedStack = widget.addStack();
 updatedStack.layoutHorizontally(); // To place updated time on the left

 let updateTxt = updatedStack.addText("Updated at:");
 updateTxt.font = Font.boldSystemFont(9); 
 updateTxt.textColor = new Color("#eeeeee");

 let currentTime = new Date()
 let df = new DateFormatter()
 df.useShortTimeStyle()
 let updateTime = updatedStack.addText(df.string(currentTime))

 updateTime.font = Font.boldSystemFont(9);
 updateTime.textColor = new Color("#eeeeee");
 widget.addSpacer(6);

 // Logo and Title with Left Alignment
 let logoStack = widget.addStack();
 logoStack.layoutHorizontally(); 

 let logoImage = await new Request("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAMAAAAp4XiDAAAAgVBMVEVHcEzi6+NsqXimxKrr8ez9/f3y9vPZ5Nr////O3dBgpG250b6RuZf////D18eDsor///93rYFJnV2wzLX////////+/v7///////////////84mE0AkTQYmE4jmVEAlUYAigcSl0v////+/v4KlkkNlkkAjiksl0szmlYAjRsXkjtf+KRgAAAAHHRSTlMA/v3+/vr+/tv+/v3+zP3+6P7+/YVwKV4Ula39gnzuGwAAArxJREFUeF6tlomyqjAMQClQkMV1uWu6svv/H/iSKN6rg+idecdRW80xKQ1gQLx9LjYbKWU14kcuc4lsNsvDR3DhwCHVDCR7RB4D5guH/gU47MA5vKx8ItKnCEmR77iOCnNmOUA7DbQwEgrMs/kIPvEts6CcmsYpd0EBkHMMFt4nOejmBXS7xoq+AixPgGrqF3Cmi71fkpL+UalQaf+r0jjnmua3srgoTt+jKF5rZ4ypFc+uimfF2HvAGaVaC13XnfBNuzul7ovVHSFogHIl4jgWaREORt0qJq/8LyokGiAXNPJEteqMu1VCWV1bX/IzsnniRwG9FNxEljETDyKbkSGxXwVL0aB/HzGnI0aglux5mPcJqiIHpJTUureKMoO1tqUf9jFYnAxtSHGl1cpp/lyc3I3SaKRvSUl2isaAiq/WoLAdh/2UUiPastIb3oNdwll61O2KVnwtTE4rjWpTL734xhrtluy9vSp+UqkVbCWtbLXfZzQQnfkprJpS2BHoIBVuTLYzzs0WhmjYZbz7vD37k1HNqDzIolveDV9J6Yk4BzW/FgWhJD/ahuG6IFmAmi9M2xUZoQXERlRc2aq5LE1zorWntldK6ZqbZ2X1nOJMH3Nf0dWKJ88VKpuzaMxiXsnSOKDC5NbSJdbuaS3FrEJ6QWFJUa7XZeZJWYObU7gtyfHjC0Y97LG4G3sswVCGLLEzalrxrPCszTOUGCywA9XcK/zDURSVBn12YMijVZamWVHu+KJ0pxCOzuG2HlEa6IxuBzsY7epJpVZ8ZWV+5vTCpU40/zQNf3ejSFL+fktyLyp9clEEqD8pC+8l3V5d84y6H0q+vR48LmYAY+onmRo3fMcY/B68STTTsOtOT1nH578KwZGvILF4Suwr/kOCfHovr/eRhw9Cen8MmKP0L7KhHMzbYbl4geXxg4R/Q/MTKcosnaMAAAAASUVORK5CYII=").loadImage(); // Replace with your base64 image string
 let logo = logoStack.addImage(logoImage);
 logo.imageSize = new Size(30, 30);

 logoStack.addSpacer();
 let titleElement = logoStack.addText("Green Square");
 titleElement.font = Font.boldSystemFont(14);
 titleElement.textColor = Color.white();
 titleElement.leftAlignText();

 widget.addSpacer(10); 


// Time Information
// Primary Departure
let departTime = new Date(trains[0].departureTimeEstimated || trains[0].departureTimePlanned);
let minutesUntilDeparture = Math.floor((departTime - Date.now()) / 60000);

// Time Text Stack (Horizontal)
let timeTextStack = widget.addStack();
timeTextStack.layoutHorizontally(); // Left to Right Alignment

let timeText = ""
if (minutesUntilDeparture <= 0) {
  timeText = timeTextStack.addText("Now");
} else {
  timeText = timeTextStack.addText(`${minutesUntilDeparture} min`);
}
timeText.font = Font.boldSystemFont(24);
timeText.textColor = Color.white();

// Add Spacer to push the small text to the right
timeTextStack.addSpacer();

// Secondary Departure (If it exists)
if (trains.length > 1) {
  let nextDepartTime = new Date(trains[1].departureTimeEstimated || trains[1].departureTimePlanned);
  let minutesUntilNextDeparture = Math.floor((nextDepartTime - Date.now()) / 60000);

  let nextTimeText = timeTextStack.addText(`Then \n${minutesUntilNextDeparture} min`);
  nextTimeText.font = Font.systemFont(12); 
  nextTimeText.textColor = Color.white(); 
}


// Destination 
let destination = trains[0].transportation.destination.name;

let destinationText = widget.addText(`To ${destination}`);
destinationText.font = Font.systemFont(14);
destinationText.textColor = Color.white(); 

 return widget;
}

async function fetchTrainTimes() {
 const apiKey = "KEY_GOES_HERE"; // Replace with your API Key
 const greenSquareStationId = "201710"; 
 const url = `https://api.transport.nsw.gov.au/v1/tp/departure_mon?outputFormat=rapidJSON&coordOutputFormat=EPSG%3A4326&mode=direct&type_dm=stop&name_dm=${greenSquareStationId}&direction_dm=city&departureMonitorMacro=true&TfNSWDM=true&version=10.2.2.48`;

 const req = new Request(url);
 req.headers = {
 "Authorization": `apikey ${apiKey}`
 };

 const result = await req.loadJSON();

 let nextTrains = result.stopEvents.filter(event => {
 const destination = event.transportation.destination.name;
 return destination.includes("Central") || destination.includes("Town Hall") || destination.includes("City"); 
 }).slice(0, 2); // Fetch top two trains

 return nextTrains; 
}

