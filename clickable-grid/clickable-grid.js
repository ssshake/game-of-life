	var canvas = document.getElementById("canvas"),
		c = canvas.getContext("2d");
	canvas.addEventListener('click', handleClick);
	canvas.addEventListener('mousemove', handleClick);

	function drawBox() {
		c.beginPath();
		c.fillStyle = "white";
		c.lineWidth = 3;
		c.strokeStyle = 'black';
		for (var row = 0; row < 14; row++) {
			for (var column = 0; column < 14; column++) {
				var x = column * 40;
				var y = row * 40;
				c.rect(x, y, 40, 40);
				c.fill();
				c.stroke();
			}
		}
		c.closePath();
	}

	function handleClick(e) {
		c.fillStyle = "black";
      
        c.fillRect(Math.floor(e.offsetX/40)*40, 
                   Math.floor(e.offsetY/40)*40,
                   40, 40);
	}

	drawBox();
