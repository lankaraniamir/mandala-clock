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
                if (j == i - 1) {
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
        colors[j+1] = color(cur[0], cur[1], cur[2], 255);
    }


    // Day of month defines stroke weight
    // strokeWeight(2.5 * (day() - 1) / 30)
    strokeWeight(2.5 * (day() + 9) / 30)
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

// function draw_undulating_shape(points, radius, x_origin, y_origin, j) {
function draw_undulating_shape(points, radius, j) {
    if (points > 2) {
        fill(colors[j])
    } else if (points == 1) {
        fill(colors[j])
        circle(0, 0, 2 * radius)
        return 0;
    } else {
        stroke(colors[j])
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
    if (points == 2)
        stroke(colors[j])
    else if (colors[0] == black)
        fill(white)
    else
        fill(black)

    half = Math.floor(points / 2);
    skip = get_highest_relevant_coprime(half, points);
    if (skip <= 1) {
        circle(0, 0, 2 * radius)
        return 0;
    }
    if (skip > 1)
        skip = get_highest_relevant_coprime(skip - 1, points);
    while (skip > 11 / 30 * points)
        skip = get_highest_relevant_coprime(skip - 1, points);

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

    r_outer = .88 * (subsections * width / 120) + .05 * width;
    diminish = 1.25
    for (let j = 0; j < subsections; j++) {
        if (j == 0) {
            r = r_outer + .037 * subsections * width / 120
            draw_undulating_shape(points, r, j)
        } else if (j % 15 != 0) {
            r = r_outer * (1 - j / subsections) ^ diminish;
            rotate(rotation + 1 / (j + 3));
            draw_undulating_shape(points, r, j % color_amount);
        } else {
            r = r_outer * (1 - j / subsections) ^ diminish;
            rotate(8 * rotation + 3 / (j))
            draw_semi_undulating_shape(points, r, j % color_amount);
            if (points > 1)
                draw_undulating_shape(points, r, j % color_amount);
        }
    }
}

function draw_hour(points, width, cur) {
// function draw_hour(points, radius, j) {
    l = .041
    sep = .09
    radius = .95 * width * l
    // if (points == 1)
    //     stroke(colors[0])
    // else

    loc = []
    if (cur == 0)
        loc = [width * l, height * l]
    else if (cur == 1)
        loc = [width * (1 - l), height * (1 - l)]
    else if (cur == 2)
        loc  = [width * l, height * (1 - l)]
    else if (cur == 3)
        loc  = [width * (1 - l), height * l]
    else if (cur == 4)
        loc = [width * sep, height * (1 - l)];
    else if (cur == 5)
        loc = [width * (1 - sep), height * l];
    else if (cur == 6)
        loc = [width * l, height * (1 - sep)];
    else if (cur == 7)
        loc = [width * (1 - l), height * sep];
    else if (cur == 8)
        loc = [width * (1 - sep), height * (1 - l)];
    else if (cur == 9)
        loc = [width * sep, height * l];
    else if (cur == 10)
        loc = [width * l, height * sep];
    else if (cur == 11)
        loc = [width * (1 - l), height * (1 - sep)];

    if (points > 2) {
        fill(colors[cur])
        beginShape();
        half = Math.floor(points / 2);
        skip = get_highest_relevant_coprime(half, points);
        for (let i = 0; i < points; i++) {
            cur = (i * skip) % points;
            angle = 2 * PI * cur / points;
            x = loc[0] + Math.cos(angle) * radius;
            y = loc[1] + Math.sin(angle) * radius;
            vertex(x, y);
        }
        endShape();
    } else if (points == 1) {
        fill(colors[cur])
        circle(loc[0], loc[1], 2 * radius)
        return 0;
    } else {
        beginShape();
        stroke(colors[cur])
        vertex(loc[0] + Math.cos(7*PI/4) * radius*.85,
            loc[1] + Math.sin(7*PI/4) * radius*.85);
        vertex(loc[0] + Math.cos(3*PI/4) * radius*.85,
            loc[1] + Math.sin(3*PI/4) * radius*.85)
        endShape();
    }
}

function draw() {
    // pattern = hour();
    pattern = 12;
    // points = minute() + 1; //edges=minutes
    points = 15; //edges=minutes
    subsections = second();

    stroke(stroke_color)
    if (pattern > 12) {
        color_amount = pattern - 12;
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

    if (points <= 1)
        stroke(colors[0])
    else
        stroke(stroke_color)

    for (i=0; i < color_amount; i++) {
        draw_hour(points, width, i);
    }

    draw_shapes(width / 2, height / 2, color_amount, points, subsections);
}
