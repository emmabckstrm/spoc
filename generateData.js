
var generateLegendData = function() {
	var i = 6;
	var dataArray = [];
	var bubbleNum = interpolatedColors.length;
	var bubbleRadiusStep = maxBubbleRadius/bubbleNum;
	var currentBubbleRadius = minBubbleRadius;
	var currentX = minBubbleRadius + 5;
		for (var j=0; j<bubbleNum; j++) {

			var obj = {
				'posX': currentX,
				'posY': 25,
				'fill': interpolatedColors[j],
				'num': j,
				'radius': currentBubbleRadius,
			};
			dataArray[j] = obj;
			currentBubbleRadius += bubbleRadiusStep;
			currentX += currentBubbleRadius*1.7;

		}
	return dataArray;
}

var generateWeekdayData = function() {
	var j = 0;
	var dataArray = [];
		for (var i=0; i<numberOfArms; i=i+4) {

			var obj = {
				'posX': origin.x + topLabels[i].x,
				'posY': origin.y + topLabels[i].y,
				'radialX': i,
				'label': monthsArr[j],
				'num': j,
			};
			dataArray[j] = obj;
			j += 1;

		}
	return dataArray;
}

var generateMonthData = function() {
	var i = 0;
	var dataArray = [];
		for (var j=0; j<12; j++) {

			var obj = {
				'posX': origin.x + topLabels[i].x,
				'posY': origin.y + topLabels[i].y,
				'radialX': i,
				'label': monthsArr[j],
				'num': j,
			};
			dataArray[j] = obj;

			// how many weeks for each monthsArr
			i += numberOfDaysPerMonth[j] / 7;
			if (numberOfDaysPerMonth[j] / 7 > 4.3) {
				i += 0.3;
			}
			i = Math.round(i);


		}
	return dataArray;
}

var generateSeasonData = function() {
	var i = 6;
	var dataArray = [];
		for (var j=0; j<4; j++) {

			var obj = {
				'posX': origin.x + topLabels[i].x,
				'posY': origin.y + topLabels[i].y,
				'radialX': i,
				'label': seasonLabels[j],
				'num': j,
			};
			dataArray[j] = obj;


			i += 13;
		}
	return dataArray;
}

var generateWeekData = function() {
	var i = 0;
	var dataArray = [];
		for (var j=0; j<numberOfArms/4; j++) {
			var obj = {
				'posX': origin.x + topLabels[i].x,
				'posY': origin.y + topLabels[i].y,
				'radialX': i,
				'label': 'w. ' + String(i+1),
				'num': j,
			};
			dataArray[j] = obj;


			i += 4;
		}
	return dataArray;
}

var generateRandomData = function() {
	var dataArray = [];
	for (var i=0; i<numberOfArms; i++) {
		dataArray[i] = [];

		for (var c=0; c<numberOfLayers; c++) {

			// Random number between 0 and 1
			dataArray[i][c] = getRandomArbitrary(0,1);

		}

	}
	return dataArray;

}


var generateRandomDataOneArray = function() {
	var dataArray = [];
	var j = 0;
	for (var i=0; i<numberOfArms; i++) {
		//dataArray[i] = [];

		for (var c=0; c<numberOfLayers; c++) {

			// Random number between 0 and 1
			dataArray[j] = getRandomArbitrary(0,1);
			j += 1;

		}

	}
	return dataArray;

}

var generateRandomUserData = function() {
	var dataArray = [];
	for (var i=0; i<numberOfArms; i++) {
		dataArray[i] = [];

		shoppedToday = getRandomInt(0,2);

		for (var c=0; c<numberOfLayers; c++) {

			if (shoppedToday) {
				shoppedThisCategory = getRandomInt(0,2);
				if (shoppedThisCategory) {
					// Random number between 0 and 1
					dataArray[i][c] = getRandomArbitrary(0,1);
				} else {
					dataArray[i][c] = 0;
				}
			} else {
				dataArray[i][c] = 0;
			}
		}

	}

	return dataArray;
}

var generateRandomUserDataOneArray = function() {
	var dataArray = [];
	var j = 0;

	for (var i=0; i<numberOfArms; i++) {
		shoppedToday = getRandomInt(0,2);

		for (var c=0; c<numberOfLayers; c++) {

			if (shoppedToday) {
				shoppedThisCategory = getRandomInt(0,2);
				if (shoppedThisCategory) {
					dataArray[j] = getRandomArbitrary(0,1);
				} else {
					dataArray[j] = 0;
				}
			} else {
				dataArray[j] = 0;
			}
			j += 1;
		}

	}

	return dataArray;
}

var updateAggregateCategoryData = function(d) {
	var totalCategory = 0;
	var k = 0;
	for (var j=0; j<daysToShow; j++) {
		for (var i=0; i<numberOfLayers; i++) {
			totalCategory += d[k];
			categoryData[i].value += d[k];///daysToShow;
			k += 1;
		}
		totalCategory = 0;
	}
	for (var l=0; l<categoryData.length; l++) {
		categoryData[l].value /= daysToShow;
	}
	//console.log(categoryData);
}

//	Takes an array of bubbleData and a new array. Will add the new data to
//	bubble array under bubbleData[i].values dictionary
var updateBubbleData = function(bubbleData, newData, newDataKey) {
	var j = 0;
	for (var i=0; i<numberOfArms; i++) {
		for (var c=0; c<numberOfLayers; c++) {

			bubbleData[j].values[newDataKey] = newData[j];

			j += 1;
		}
	}
	return bubbleData;
}

var generateBubbleData = function() {
	var j = 0;
	var dataArray = [];
	for (var i=0; i<numberOfArms; i++) {
		for (var c=0; c<numberOfLayers; c++) {

			var bubbleObj = {
				'posX': origin.x + coordSys[i][c].x,
				'posY': origin.y + coordSys[i][c].y,
				'radialX': i,
				'radialY': c,
				'layer': c,
				'values': {},
				'num': j,
			};
			dataArray[j] = bubbleObj;
			j += 1;

		}

	}
	var newData = generateRandomDataOneArray();
	dataArray = updateBubbleData(dataArray, newData, 'initial');
	updateAggregateCategoryData(newData);
	var usrData = generateRandomUserDataOneArray();
	dataArray = updateBubbleData(dataArray, usrData, 'user1');
	usrData = generateRandomUserDataOneArray();
	dataArray = updateBubbleData(dataArray, usrData, 'user2');
	usrData = generateRandomUserDataOneArray();
	dataArray = updateBubbleData(dataArray, usrData, 'user3');
	usrData = generateRandomUserDataOneArray();
	dataArray = updateBubbleData(dataArray, usrData, 'user4');
	return dataArray;

}
var storeNames = ["COOP Järna", "COOP Fridhemsplan", "COOP Gnesta"];
var generateTopList = function(size) {
	var dataArray = [];
}

var legendData = generateLegendData();
var monthData = generateMonthData();
var labelData = generateWeekData();
var randomData = generateRandomData();
var randomUserData = generateRandomUserData();
var bubbleData = generateBubbleData();
