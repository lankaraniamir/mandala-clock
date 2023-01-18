function setup() {
	h = 900
	w = 900
	createCanvas(h, w);
	rotation = 0
	colors = [];
	temp_colors = [];
	c1 = Math.floor(Math.random() * 256);
	c2 = Math.floor(Math.random() * 256);
	c3 = Math.floor(Math.random() * 256);
	temp_colors[0] = [c1, c2, c3];
	for (let i = 1; i < 12; i++) {
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
	for (let j = 0; j < 12; j++) {
		cur = temp_colors[j];
		colors[j] = color(cur[0], cur[1], cur[2], 255);
	}

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

function draw_undulating_shape(points, radius, x_origin, y_origin, j) {
	fill(colors[j])
	if (points == 1) {
		circle(0, 0, 2*radius)
		return 0;
	}

	if (points == 2)
		stroke(colors[j])
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

function draw_semi_undulating_shape(points, radius, x_origin, y_origin, j) {
	if (hour() > 12) {
		fill(white)
	} else {
		fill(black)
	}

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
	rotate(rotation)

	r_outer = .88 * (subsections * width / 120) + .05 * width;
	diminish = 1.25
	for (let j = 0; j < subsections; j++) {
		if (j == 0) {
			r = r_outer+.037*subsections*width/120
			// rotate(rotation)
			draw_undulating_shape(points, r, x_origin, y_origin, j)
		} else if (j % 15 != 0) {
			r = r_outer * (1 - j / subsections)^diminish;
			rotate(rotation + 1/j);
			draw_undulating_shape(points, r, x_origin, y_origin, j%color_amount);
		} else {
			r = r_outer * (1 - j / subsections)^diminish;
			rotate(8*rotation + 3/j)
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

	loggable = true
	if (loggable & subsections == 0) {
		console.log(points-1)
		loggable = false
	} else if (!loggable & subsections == 1) {
		loggable = true
	}

	stroke(black)
	if (pattern > 12) {
		color_amount = pattern-12;
		colors[0] = black;
		// stroke(white)
		background(white);
	} else if (pattern == 0) {
		color_amount = 12;
		colors[0] = black;
		// stroke(white)
		background(white);
	} else {
		color_amount = pattern;
		colors[0] = white;
		stroke(black)
		background(black);
	}

	for (let i = color_amount-1; i >= 0; i--) {
		l = .041
		sep = .09
		r = .95*width*l
		if (i == 0) {
			draw_hour(points, r, width*l, height*l, 0);
		} else if (i == 1) {
			draw_hour(points, r, width*(1-l), height*(1-l), 1);
		} else if (i == 2) {
			draw_hour(points, r, width*l, height*(1-l), 2);
		} else if (i == 3) {
			draw_hour(points, r, width*(1-l), height*l, 3);
		} else if (i == 4) {
			draw_hour(points, r, width*sep, height*(1-l), 4);
		} else if (i == 5) {
			draw_hour(points, r, width*(1-sep), height*l, 5);
		} else if (i == 6) {
			draw_hour(points, r, width*l, height*(1-sep), 6);
		} else if (i == 7) {
			draw_hour(points, r, width*(1-l), height*sep, 7);
		} else if (i == 8) {
			draw_hour(points, r, width*(1-sep), height*(1-l), 8);
		} else if (i == 9) {
			draw_hour(points, r, width*sep, height*l, 9);
		} else if (i == 10) {
			draw_hour(points, r, width*l, height*sep, 10);
		} else if (i == 11) {
			draw_hour(points, r, width*(1-l), height*(1-sep), 11);
		}
	}

	draw_shapes(width/2, height/2, color_amount, points, subsections);
}
