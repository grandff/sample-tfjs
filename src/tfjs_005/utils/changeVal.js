// brand value
export const changeBrandValue = (brand) => {
	let result = 0;
	switch (brand){
		case 'audi' :
			result = 1;
			break;
		case 'bmw' :
			result = 2;
			break;
		case 'ford' :
			result = 3;
			break;
		case 'hyundi' :
			result = 4;
			break;
		case 'merc' :
			result = 5;
			break;
		case 'skoda' :
			result = 6;
			break;
		case 'toyota' :
			result = 7;
			break;
		case 'vauxhall' :
			result = 8;
			break;
		case 'vw' :
			result = 9;
			break;
		default : 
			result = -1;
	}
	return result;
}

// model
/*
case 'Santa Fe' : 
	result = 1; 
	break;
case 'GTC' :
case 'S3' :
case 'Kamiq' :
case 'RS6' :
case 'CLA Class' :
case 'Land Cruiser' :
case 'M Class' :
case 'Q8' :
case 'Mustang' :
case 'IX35' :
case 'Antara' :
case 'Tourneo Connect' :
case 'CC' :
case 'GT86' :
case 'X-CLASS' :
case 'I800' :
case 'Caddy Maxi Life' :
case 'Combo Life' :
case 'Rapid' :
case 'SQ7' :
case 'Grand C-MAX' :
case 'Tourneo Custom' :
case 'California' :
case 'Agila' :
case 'A7' :
case 'Zafira Tourer' :
case 'G Class' :
case 'X6' :
case 'M2' :
case 'X7' :
case '7 Series' :
case 'Z4' :
case 'Hilux' :
case 'GLB Class' :
case 'M5' :
case 'RS3' :
case 'Caddy Life' :
case 'SQ5' :
case 'Supra' :
case '8 Series' :
case 'Fusion' :
case 'M6' :
case 'M3' :
case 'Jetta' :
case 'S4' :
case 'R8' :
case 'PROACE VERSO' :
case 'Caddy' :
case 'Getz' :
case 'Eos' :
case 'CLK' :
case 'IQ' :
case 'Z3' :
case 'Roomster' :
default :
*/

// transmission
export const changeTransMission = (mission) => {
	let result = 0;
	switch (mission){
		case 'Automatic' :
			result = 1;
			break;
		case 'Semi-Auto' :
			result = 2;
			break;
		case 'Manual' :
			result = 3;
			break;
		default :
			result = -1;
	}

	return result;
}

// fuelType
export const changeFuelType = (fuel) => {
	let result = 0;
	switch(fuel) {
		case 'Diesel' :
			result = 1;
			break;
		case 'Petrol' :
			result = 2;
			break;
		case 'Hybrid' :
			result = 3;
			break;
		case 'Electric' :
			result = 4;
			break;
		case 'Other' :
			result = 5;
			break;
		default :
			result = -1;
	}

	return result;
}