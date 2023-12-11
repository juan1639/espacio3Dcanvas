// ============================================================================
//  Demo Plataformas
// 
// ============================================================================
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const constante = {
	FPS: 60,
	TILE_X: 50,
	TILE_Y: 50,
	COLUMNAS: 16,
	FILAS: 11,
	NRO_ESTRELLAS: 400
}

const resolucion = [constante.TILE_X * constante.COLUMNAS, constante.TILE_Y * constante.FILAS]

const objeto = {
	estrella: [],
}

const controles = {
	izquierda: false,
	derecha: false,
	arriba: false,
	abajo: false
}

// ============================================================================
document.addEventListener('keydown', (ev) => {

	console.log(ev.key);

	if (ev.key === 'ArrowLeft') {
		controles.izquierda = true;

	} else if (ev.key === 'ArrowRight') {
		controles.derecha = true;
	}
});

document.addEventListener('keyup', (ev) => {

	console.log(ev.key);

	if (ev.key === 'ArrowLeft') {
		controles.izquierda = false;

	} else if (ev.key === 'ArrowRight') {
		controles.derecha = false;
	}
});

// ============================================================================
class Estrella {

	constructor() {

		this.rect = {
			x: 0,
			y: 0,
			ancho: 0,
			alto: 0
		}

		this.move = {
			angulo: undefined,
			vel: undefined,
			alpha: 0.4,
		}

		this.color = 'white';

		this.check_resetEstrella(true);
	}

	dibuja() {

		this.actualiza();

		ctx.beginPath();

		ctx.globalAlpha = this.move.alpha;
		ctx.fillStyle = this.color;
		ctx.arc(this.rect.x, this.rect.y, this.rect.ancho, 0, 2 * Math.PI);
		ctx.fill();

		ctx.closePath();
	}

	actualiza() {

		this.rect.x += Math.cos(this.move.angulo) * this.move.vel;
		this.rect.y += Math.sin(this.move.angulo) * this.move.vel;

		this.rect.ancho += this.move.vel / 200;
		this.move.alpha += this.move.vel / 2000;

		this.check_resetEstrella(false);
	}

	check_resetEstrella(inicial) {

		const ancho = this.rect.ancho * 2;
		const alto = this.rect.alto * 2;

		if (this.rect.x + ancho > resolucion[0] || this.rect.x < -ancho || this.rect.y + alto > resolucion[1] || this.rect.y < -alto || inicial) {

			const grados_rnd = this.numero_random(0, 359);

			const lista_colores = [
				'white', 'white', 'white',
				'lightblue', 'lightskyblue', 'lightskyblue',
				'lightyellow', 'lightyellow', 'lightblue'
			];

			this.rect.x = this.numero_random(Math.floor(canvas.width / 2) - 2, Math.floor(canvas.width / 2) + 2);
			this.rect.y = this.numero_random(Math.floor(canvas.height / 2) - 2, Math.floor(canvas.height / 2) + 2);
			this.rect.ancho = 1.0;
			this.rect.alto = 1.0;

			this.move.angulo = (grados_rnd * Math.PI) / 180;
			this.move.vel = this.numero_random(1, 4);
			this.move.alpha = 0.4;

			const index = Math.floor(Math.random()* lista_colores.length);
			this.color = lista_colores[index];
		}
	}

	numero_random(min, max) {
		return Math.floor(Math.random()* (max - min) + min);
	}
}

// ============================================================================
window.onload = () => {

	canvas.width = resolucion[0];
	canvas.height = resolucion[1];

	ctx.scale(1, 1);

	// -------------------------------------------------
	//objeto.jugador.push(new Jugador(pos_inicial.jugador[0], pos_inicial.jugador[1]));

	for (let i = 0; i < constante.NRO_ESTRELLAS; i ++) {
		objeto.estrella.push(new Estrella());
	}

	setInterval(() => {
		bucle_principal();
	}, 1000 / constante.FPS);
}

// ===================================================================
function bucle_principal() {

	ctx.fillStyle = 'rgb(0, 0, 35)';
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	objeto.estrella.forEach(star => {
		star.dibuja();
	});
}
