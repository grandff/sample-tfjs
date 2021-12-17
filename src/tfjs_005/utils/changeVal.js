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

// transmission

// fuelType