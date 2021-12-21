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
			result = 0;
	}
	return result;
}

// model
export const chnageModel = (model) => {
	let result = 0;
	switch(model){
		case 'Santa Fe' : 
			result = 1; 
			break;
		case 'GTC' :
			result = 2; 
			break;
		case 'S3' :
			result = 3; 
			break;
		case 'Kamiq' :
			result = 4; 
			break;
		case 'RS6' :
			result = 5; 
			break;
		case 'CLA Class' :
			result = 6; 
			break;
		case 'Land Cruiser' :
			result = 7; 
			break;
		case 'M Class' :
			result = 8; 
			break;
		case 'Q8' :
			result = 9; 
			break;
		case 'Mustang' :
			result = 10; 
			break;
		case 'IX35' :
			result = 11; 
			break;
		case 'Antara' :
			result = 12; 
			break;
		case 'Tourneo Connect' :
			result = 13; 
			break;
		case 'CC' :
			result = 14; 
			break;
		case 'GT86' :
			result = 15; 
			break;
		case 'X-CLASS' :
			result = 16; 
			break;
		case 'I800' :
			result = 17; 
			break;
		case 'Caddy Maxi Life' :
			result = 18; 
			break;
		case 'Combo Life' :
			result = 19; 
			break;
		case 'Rapid' :
			result = 20; 
			break;
		case 'SQ7' :
			result = 21; 
			break;
		case 'Grand C-MAX' :
			result = 22; 
			break;
		case 'Tourneo Custom' :
			result = 23; 
			break;
		case 'California' :
			result = 24; 
			break;
		case 'Agila' :
			result = 25; 
			break;
		case 'A7' :
			result = 26; 
			break;
		case 'Zafira Tourer' :
			result = 27; 
			break;
		case 'G Class' :
			result = 28; 
			break;
		case 'X6' :
			result = 29; 
			break;
		case 'M2' :
			result = 30; 
			break;
		case 'X7' :
			result = 31; 
			break;
		case '7 Series' :
			result = 32; 
			break;
		case 'Z4' :
			result = 33; 
			break;
		case 'Hilux' :
			result = 34; 
			break;
		case 'GLB Class' :
			result = 35; 
			break;
		case 'M5' :
			result = 36; 
			break;
		case 'RS3' :
			result = 37; 
			break;
		case 'Caddy Life' :
			result = 38; 
			break;
		case 'SQ5' :
			result = 39; 
			break;
		case 'Supra' :
			result = 40; 
			break;
		case '8 Series' :
			result = 41; 
			break;
		case 'Fusion' :
			result = 42; 
			break;
		case 'M6' :
			result = 43; 
			break;
		case 'M3' :
			result = 44; 
			break;
		case 'Jetta' :
			result = 45; 
			break;
		case 'S4' :
			result = 46; 
			break;
		case 'R8' :
			result = 47; 
			break;
		case 'PROACE VERSO' :
			result = 48; 
			break;
		case 'Caddy' :
			result = 49; 
			break;
		case 'Getz' :
			result = 50; 
			break;
		case 'Eos' :
			result = 51; 
			break;
		case 'CLK' :
			result = 52; 
			break;
		case 'IQ' :
			result = 53; 
			break;
		case 'Z3' :
			result = 54; 
			break;
		case 'Roomster' :
			result = 55; 
			break;
		default :
			result = 0; 
	}

	return result;
}

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
			result = 0;
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
			result = 0;
	}

	return result;
}