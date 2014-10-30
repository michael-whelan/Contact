function Stick (maxLength, active) {
	this.active = active;
	this.atLimit = false;
	this.length = 1;
	this.maxLength = maxLength;
	this.limit = {
		x: 0,
		y: 0
	};
	this.input = {
		x: 0,
		y: 0
	};
};

Stick.prototype.getRadians = function (x, y) {
	return Math.atan2(x, -y);
};

Stick.prototype.getVectorFromRadians = function (radians, length) {
	length = (Number(length) || 1);
	return {
		x: (Math.sin(radians) * length),
		y: (-Math.cos(radians) * length)
	};
};

Stick.prototype.getVectorLength = function (v) {
	return Math.sqrt((v.x * v.x) + (v.y * v.y));
};

Stick.prototype.getVectorNormal = function (v) {
	var len = this.getVectorLength(v);
	if (len === 0) {
		return v;
	} else {
		return {
			x: (v.x * (1 / len)),
			y: (v.y * (1 / len))
		};
	}
};

Stick.prototype.setLimitXY = function (x, y) {
	this.limit = {
		x: x,
		y: y
	};
};

Stick.prototype.setInputXY = function (x, y) {
	this.input = {
		x: x,
		y: y
	};
};

Stick.prototype.subtractVectors = function (v1, v2) {
	return {
		x: (v1.x - v2.x),
		y: (v1.y - v2.y)
	};
};

Stick.prototype.update = function () {
	var diff = this.subtractVectors(this.input, this.limit);
	var length = this.getVectorLength(diff);

	if (Math.round(length) >= this.maxLength) {
		length = this.maxLength;

		var rads = this.getRadians(diff.x, diff.y);

		this.atLimit = true;
		this.input = this.getVectorFromRadians(rads, length);
		this.input.x += this.limit.x;
		this.input.y += this.limit.y;
	} else {
		this.atLimit = false;
	}

	this.length = length;
	this.normal = this.getVectorNormal(diff);
	//console.log(this.normal);
};


Stick.prototype.draw = function() {
	if (!this.active) {
		return;
	}

	ctx.save();

	// Limit
	ctx.beginPath();
	ctx.arc(this.limit.x, this.limit.y, limitSize, 0, (Math.PI * 2), true);

	ctx.lineWidth = 3;
	if (this.atLimit) {
		ctx.strokeStyle = "rgb(200, 0, 0)";
	} else {
		ctx.strokeStyle = "rgb(0, 0, 0)";
	}
	ctx.stroke();

	// Base
	ctx.beginPath();
	ctx.arc(this.limit.x, this.limit.y, (limitSize / 2), 0, (Math.PI * 2), true);

	ctx.lineWidth = 3;
	ctx.strokeStyle = "rgb(200, 200, 200)";
	ctx.stroke();

	// Input
	ctx.beginPath();
	ctx.arc(this.input.x, this.input.y, inputSize, 0, (Math.PI * 2), true);
	ctx.fillStyle = "rgb(0, 0, 200)";
	ctx.fill();

	ctx.restore();
};