var run_tl = new TimelineLite({
		onComplete: function() {
			run_tl.play(0);
		},
	}),
	jump_tl = new TimelineLite({
		paused:true,
		onComplete:function() {
			run_tl.play(0);
		}
	}),
	dur = 0.125;

TweenLite.defaultEase = Linear.easeNone;

run_tl.timeScale(1.25);

run_tl.add("Step")
	.add(bodyTl(), "Step")
	.add(armsTl(), "Step")
	.add(legRTl(), "Step")
	.add(legLTl(), "Step")





// Running Methods
function armsTl() {
	var arms_tl = new TimelineLite();

	arms_tl.add("Start")
		.to(armR, dur * 3, {
			x: "150",
			ease: Power1.easeInOut
		}, "Start")
		.to(armL, dur * 2.75, {
			x: "-100",
			ease: Power1.easeInOut
		}, "Start")

	.add("Return")
		.to(armR, dur * 2.5, {
			x: "0",
			ease: Power1.easeInOut
		}, "Return")
		.to(armL, dur * 3, {
			x: "0",
			ease: Power1.easeInOut
		}, "Return")

	console.log("Arms TL", arms_tl.totalDuration());

	return arms_tl;
}

function bodyTl() {
	var body_tl = new TimelineLite();

	body_tl.add(bodyBounce())
		.add(bodyBounce())

	console.log("Body TL", body_tl.totalDuration());

	return body_tl;
}

function bodyBounce() {
	var tl = new TimelineLite();

	tl.add("Up")

	.to(momo, dur, {
			y: "-50",
			ease: Power2.easeInOut
		}, "Up")
		.to(shadow, dur, {scale: 0.98, opacity: 0.9, transformOrigin: "50% 50%", ease: Power2.easeInOut}, "Up")

	.add("Down")
		.to(momo, dur, {
			y: "0",
			ease: Power2.easeIn
		}, "Down")
		.to(shadow, dur, {
			scale: 1,
			opacity: 1,
			ease: Power2.easeIn
		}, "Down")

	.to(cap, dur, {
			y: "-50",
			ease: Power2.easeInOut
		}, "Up+=" + dur * 0.8)
		.to(cap, dur, {
			y: "0",
			ease: Power2.easeIn
		})

	return tl;
}

function legLTl() {
	var tl = new TimelineLite();

	tl.add("Start").set(legL, {x: "-30",y: "10"})
		.to(legL, dur * 2, {
			y: "-30",
			rotation: "30",
			transformOrigin: "50% 0"
		})
		.to(legL, dur, {
			x: 0,
			y: 0,
			rotation: 0
		})
		.to(legL, dur, {
			x: "80",
			y: "10",
			rotation: 0
		})
		.to(legL, dur * 2, {
			x: "-30"
		})

	console.log("LegL:", tl.totalDuration());

	return tl;
}

function legRTl() {
	var tl = new TimelineLite();

	tl
		.set(legL, {y:10})
		.to(legR, dur, {
			y: "10",
			x: "80"
		})
		.to(legR, dur * 2, {
			x: "-30"
		})
		.to(legR, dur * 2, {
			y: "-30",
			rotation: "30",
			transformOrigin: "50% 0"
		})
		.to(legR, dur, {
			x: 0,
			y: 0,
			rotation: 0
		})

	console.log("LegR:", tl.totalDuration());

	return tl;
}





// Jumping Methods
jump_tl.add("Up")
	.to(momo, dur*2, {y:"-300", ease:Power2.easeInOut}, "Up+="+dur*0.3)
	.to(shadow, dur*2, {scale:0.6, autoAlpha:0.5, transformOrigin:"50% 50%", ease:Power2.easeInOut}, "Up+="+dur*0.3)
	.to(legR, dur, {y:"40", rotation:"20", transformOrigin:"50% 0", ease:Power2.easeInOut}, "Up+="+dur*0.3)
	.to(face, dur, {y:"30", ease:Power4.easeInOut}, "Up+="+dur)
	.to(armL, dur*2, {y:"-200", x:"50", ease:Power4.easeOut}, "Up")
	.to(armR, dur*2, {y:"50", x:"-50", ease:Power4.easeOut}, "Up+="+dur*0.3)
	.set([openR,openL], {autoAlpha:0})
	.set([blinkR,blinkL], {autoAlpha:1})

	.add("Down")
	.to(momo, dur*2, {y:"20", ease:Power2.easeIn}, "Down")
	.to(shadow, dur*2, {scale:1.01, autoAlpha:1, ease:Power2.easeIn}, "Down")
	.staggerTo([legL,legR], dur, {y:"-20", rotation:0, ease:Power2.easeInOut}, 0.1, "Down")
	.to(legL, dur, {x:"30", rotation:"-20", transformOrigin:"50% 0", ease:Power2.easeInOut}, "Down+="+dur*0.5)
	.to(face, dur, {y:"-30", ease:Power4.easeInOut}, "Down+="+dur)
	.to(armL, dur*2, {y:"-400", x:0, ease:Power2.easeIn}, "Down")
	.to(armR, dur*2, {y:"-50", x:"-50", ease:Power2.easeInOut}, "Down")
	.to(cap, dur*2, {y:"-200", rotation:"-20", ease:Power2.easeIn}, "Down")
	.set(legR, {x:0})
	.set(legL, {x:"-30"})

	.add("Bounce")
	.set(legL, {x:0, rotation:0})
		.set([openR,openL], {autoAlpha:1})
	.set([blinkR,blinkL], {autoAlpha:0})
	.to(momo, dur*2, {y:0, ease:Power2.easeOut}, "Bounce")
	.to([legL,legR], dur*2, {y:10, ease:Power2.easeOut}, "Bounce")
	.to(shadow, dur*2, {scale:1, ease:Power2.easeIn}, "Bounce")
	.to([armL,armR,face], dur*2, {y:0, x:0, ease:Back.easeOut}, "Bounce")
	.to(cap, dur*4, {y:0, rotation:0, ease:Bounce.easeOut}, "Bounce")


// AUDIO
// Looping Theme
var audio = new Audio('https://s3-us-west-2.amazonaws.com/s.cdpn.io/259155/momoBros.mp3');
audio.loop = true;
audio.play();

// Jump
var jumpFx = new Audio('https://s3-us-west-2.amazonaws.com/s.cdpn.io/259155/MomoJump.mp3');

var toggle = document.getElementById('mute');

toggle.addEventListener('click', function() {
	if(!audio.paused) {
		audio.pause();
	} else {
		audio.play();
	}
})







// BUTTON BEHAVIOUR
var btn = document.querySelector('button');

btn.addEventListener('click', function(e) {

	
	if(!jump_tl.isActive()) {
		jump_tl.play(0);
		jumpFx.play();
		run_tl.pause();
	}

	// if (run_tl.isActive()) {
	// } else {
	// 	run_tl.play();
	// }
	
});