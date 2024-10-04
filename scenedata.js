const sceneData = [
    {
        "background": "black.jpg",
        "type": "dialogue",
        "dialogue": [
            "Ugh... My head..."
        ]
    },
    {
        "background": "hospital-room-bed.png",
        "type": "dialogue",
        "dialogue": [
            "Where... Where am I?",
            "Everything feels so heavy..."
        ]
    },
    {
        "background": "hospital-room-sitting.png",
        "type": "dialogue",
        "dialogue": [
            "I can barely think straight...",
            "I need to lie down...",
            "No. I can’t... I have to stay alert...",
            "[The door creaks open]"
        ]
    },
    {
        "background": "hospital-room-nurse-1.png",
        "type": "dialogue",
        "dialogue": [
            "Oh, you’re awake! That’s... unexpected.",
            "Hmm, you look a little restless. We’ll need to up your dosage again. Don’t worry, I’ll let the doctor know right away.",
            "In the meantime, let’s make sure you’re comfortable. Here, take this Xanax. It will help you relax.",
            "[The nurse picks up a bottle from the cluttered array of medications by your bed, shaking a pill into her palm.]",
            "Take the medicine."
        ]
    },
    {
        "background": "hospital-room-nurse-1.png",
        "type": "choice",
        "choices": [
            "Xanax",
            "Modafinil",
            "Adderall",
            "Benadryl",
            "Valium"
        ],
        "correct": [1, 2]
    },
	{
		"background": "hospital-room-nurse-1.png",
		"type": "failure",
		"dialogue": [
			"...",
			"[You feel sleepy]",
			"I'm just going to rest my eyes...",
		]
	},
    {
        "background": "hospital-room-nurse-2.png",
        "type": "dialogue",
        "dialogue": [
			"...",
            "What are you doing?! No, no, no!",
            "SPIT IT OUT! NOW! YOU FOOL!",
            "[You feel the pill slide down your throat, too late to stop it.]"
        ]
    },
    {
        "background": "hospital-room-nurse-2.png",
        "type": "dialogue",
        "dialogue": [
            "[Suddenly, a surge of adrenaline floods your body. The nurse lunges at you.]",
            "[With newfound strength, you shove her back, her body slamming into the medical equipment with a crash.]",
            "I-I need to get out of here!"
        ]
    },
    {
        "background": "hospital-room-nurse-3.png",
        "type": "dialogue",
        "dialogue": [
            "[You stumble to the door, heart pounding, and yank it open. The nurse groans behind you, slowly getting back up.]",
        ]
    },
    {
        "background": "hospital-room-nurse-3.png",
        "type": "dialogue",
        "dialogue": [
            "[You sprint down the dimly lit corridor, your legs shaky but moving with a strange urgency. The adrenaline pumps through your veins.]",
            "[You glance over your shoulder. The nurse is chasing after you, her footsteps growing louder.]",
            "No... She’s getting closer!"
        ]
    },
    {
        "background": "corridor-fibro-1.png",
        "type": "dialogue",
        "dialogue": [
            "[You reach a nearby cabinet, pushing it over to block the door. The nurse slams into it, screaming incoherently on the other side.]",
            "Stay back!"
        ]
    },
    {
        "background": "corridor-fibro-1.png",
        "type": "dialogue",
        "dialogue": [
            "[Breathing heavily, you continue running down the hallway. Your vision blurs, and everything around you feels distorted, unreal.]",
            "I can't keep this up... Something’s wrong...",
            "[As you round a corner, your body is suddenly yanked to a stop, your limbs caught in something sticky.]"
        ]
    },
    {
        "background": "corridor-fibro-2.png",
        "type": "dialogue",
        "dialogue": [
            "W-What is this? Webbing?",
            "[You struggle, but the fibrous threads only tighten, pulling you deeper into their grip.]",
            "No... It’s fibronectin... It's binding to me!",
            "[Your body feels heavy again, the effects of the medication beginning to wear off. You’re stuck, caught in a web of your own biology.]",
			"[You can just about reach your medicine bag]",
        ]
    },
    {
        "background": "corridor-fibro-2.png",
        "type": "choice",
        "choices": [
			"Ivabradine",
			"Propanolol",
            "Modafinil",
            "Benadryl",
			"Nattokinase",
        ],
        "correct": [4]
    },
    {
        "background": "corridor-fibro-2.png",
        "type": "failure",
        "dialogue": [
			"...",
			"[More platelets and fibronectic stick to your skin.]",
			"[You can't more, can't breathe...]",
			"...",
        ]
    },
    {
        "background": "corridor-fibro-2.png",
        "type": "dialogue",
        "dialogue": [
			"...",
			"[The fibronectin begins to disolve]",
			"[You manage to shake free]"
        ]
    },
];
