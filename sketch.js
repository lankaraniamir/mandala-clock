function setup() {
	h = 900
	w = 900
	createCanvas(h, w);
	rotation = 0
	
	// Colors randomly created upon initialization
	colors = [];
	temp_colors = [];
	c1 = Math.floor(Math.random() * 256);
	c2 = Math.floor(Math.random() * 256);
	c3 = Math.floor(Math.random() * 256);
	temp_colors[0] = [c1, c2, c3];
	for (let i = 1; i < 11; i++) {
		truth_check = false
		while (!truth_check) {
			c1 = Math.floor(Math.random() * 256);
			c2 = Math.floor(Math.random() * 256);
			c3 = Math.floor(Math.random() * 256);
			temp = [c1, c2, c3];
			for (let j = 0; j < i; j++) {
				if (!ensure_difference(temp, temp_colors[j]))
					break
				if (j == i-1) {
					truth_check = true
				}
			}
			if (truth_check == true & (!ensure_difference(temp, [255, 255, 255]) | !ensure_difference(temp, [0, 0, 0])))
				truth_check = False
		}
		temp_colors[i] = temp
	}
	white = color(255);
	black = color(0);
	for (let j = 0; j < 11; j++) {
		cur = temp_colors[j];
		colors[j] = color(cur[0], cur[1], cur[2], 255);
	}
	

	// Day of month defines stroke weight
	strokeWeight(2.5*(day()-1)/30)
	stroke_color = color(17)
}

function ensure_difference(new_col, old_col) {
	if (Math.abs(new_col[0] - old_col[0]) + Math.abs(new_col[1] - old_col[1]) + Math.abs(new_col[2] - old_col[2]) < 60)
		return false
	return true
}

function coprime_test(n, b) {
	while (b != 0) {
		temp = n % b
		n = b
		b = temp
	}
	return n
}

function get_highest_relevant_coprime(skip, n) {
	check = coprime_test(skip, n)
	while (check > 1) {
		skip -= 1
		check = coprime_test(skip, n)
	}
	return skip
}

function draw_undulating_shape(points, radius, j) {
	fill(colors[j])
	if (points == 1) {
		circle(0, 0, 2*radius)
		return 0;
	}
	
	beginShape();
	half = Math.floor(points / 2);
	skip = get_highest_relevant_coprime(half, points);
	for (let i = 0; i < points; i++) {
		cur = (i * skip) % points;
		angle = 2 * PI * cur / points
		x = Math.cos(angle) * radius;
		y = Math.sin(angle) * radius;
		vertex(x, y);
	}
	endShape();
}

function draw_semi_undulating_shape(points, radius, j) {
	if (colors[0] == black)
		fill(white)
	else
		fill(black)

	half = Math.floor(points / 2);
	skip = get_highest_relevant_coprime(half, points);
	if (skip <= 1) {
		circle(0, 0, 2*radius)
		return 0;
	}
	if (skip > 1)
		skip = get_highest_relevant_coprime(skip-1, points);
	while (skip > 11/30*points)
		skip = get_highest_relevant_coprime(skip-1, points);

	beginShape();
	for (let i = 0; i < points; i++) {
		cur = (i * skip) % points;
		angle = 2 * PI * cur / points
		x = Math.cos(angle) * radius;
		y = Math.sin(angle) * radius;
		vertex(x, y);
	}
	endShape();
}

function draw_shapes(x_origin, y_origin, color_amount, points, subsections) {
	translate(x_origin, y_origin)
	rotation = rotation + PI / 7000
	// rotate(rotation)

	r_outer = .88 * (subsections * width / 120) + .05 * width;
	diminish = 1.25
	for (let j = 0; j < subsections; j++) {
		if (points == 2)
			stroke(stroke_color)
		if (j == 0) {
			r = r_outer+.037*subsections*width/120
			// rotate(rotation)
			draw_undulating_shape(points, r, x_origin, y_origin, j)
		} else if (j % 15 != 0) {
			r = r_outer * (1 - j / subsections)^diminish;
			rotate(rotation + 1 / (j+3));
			draw_undulating_shape(points, r, x_origin, y_origin, j%color_amount);
		} else {
			r = r_outer * (1 - j / subsections)^diminish;
			rotate(8*rotation + 3 / (j))
			draw_semi_undulating_shape(points, r, x_origin, y_origin, j%color_amount);
			if (points > 1)
				draw_undulating_shape(points, r, x_origin, y_origin, j%color_amount);
		}
	}
}

function draw_hour(points, radius, x_origin, y_origin, j) {
	fill(colors[j])
	if (points == 1) {
		circle(x_origin, y_origin, 2*radius)
		return 0;
	}
	beginShape();
	half = Math.floor(points / 2);
	skip = get_highest_relevant_coprime(half, points);
	for (let i = 0; i < points; i++) {
		cur = (i * skip) % points;
		angle = 2 * PI * cur / points
		x = x_origin + Math.cos(angle) * radius;
		y = y_origin + Math.sin(angle) * radius;
		vertex(x, y);
	}
	endShape();
}

function draw() {
	pattern = hour();
	points = minute()+1; //edges=minutes
	subsections = second();

	stroke(stroke_color)
	if (pattern > 12) {
		color_amount = pattern-12;
		colors[0] = black;
		background(white);
	} else if (pattern == 0) {
		color_amount = 12;
		colors[0] = black;
		background(white);
	} else {
		color_amount = pattern;
		colors[0] = white;
		background(black);
	}

	l = .041
	sep = .09
	r = .95*width*l
	if (points == 1)
		stroke(colors[0])
	else
		stroke(stroke_color)
	
	if (color_amount >= 1) {
		if (points == 2)
			stroke(colors[0])
		draw_hour(points, r, width * l, height * l, 0);
	} if (color_amount >= 2) {
		if (points == 2)
			stroke(colors[1])
        	draw_hour(points, r, width * (1 - l), height * (1 - l), 1);
    	} if (color_amount >= 3) {
		if (points == 2)
			stroke(colors[2])
        	draw_hour(points, r, width * l, height * (1 - l), 2);
	} if (color_amount >= 4) {
		if (points == 2)
			stroke(colors[3])
        	draw_hour(points, r, width * (1 - l), height * l, 3);
	} if (color_amount >= 5) {
		if (points == 2)
			stroke(colors[4])
        	draw_hour(points, r, width * sep, height * (1 - l), 4);
	} if (color_amount >= 6) {
		if (points == 2)
			stroke(colors[5])
        	draw_hour(points, r, width * (1 - sep), height * l, 5);
	} if (color_amount >= 7) {
		if (points == 2)
			stroke(colors[6])
        	draw_hour(points, r, width * l, height * (1 - sep), 6);
	} if (color_amount >= 8) {
		if (points == 2)
			stroke(colors[7])
        	draw_hour(points, r, width * (1 - l), height * sep, 7);
	} if (color_amount >= 9) {
		if (points == 2)
			stroke(colors[8])
        	draw_hour(points, r, width * (1 - sep), height * (1 - l), 8);
	} if (color_amount >= 10) {
		if (points == 2)
			stroke(colors[9])
        	draw_hour(points, r, width * sep, height * l, 9);
	} if (color_amount >= 11) {
		if (points == 2)
			stroke(colors[10])
        	draw_hour(points, r, width * l, height * sep, 10);
	} if (color_amount >= 12) {
		if (points == 2)
			stroke(colors[11])
        	draw_hour(points, r, width * (1 - l), height * (1 - sep), 11);
	}

	draw_shapes(width/2, height/2, color_amount, points, subsections);
}
