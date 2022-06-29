import WAN_LOGO from "./assets/WAN.jpg"
import YOUTUBE_LOGO from "./assets/youtube.png"

const VIA = [
	{
		id: "via-1",
		name: "Nikki Cueno",
		is_available: true,
		is_wl: false
	},
	{
		id: "via-2",
		name: "Justine Judilla",
		is_available: true,
		is_wl: false
	},
	{
		id: "via-3",
		name: "Eunice Nikki Floralde",
		is_available: true,
		is_wl: false
	},
	{
		id: "via-4",
		name: "John Pallan",
		is_available: true,
		is_wl: false
	},
	{
		id: "via-5",
		name: "Diane Agreda",
		is_available: true,
		is_wl: false
	},
	{
		id: "via-6",
		name: "Reisel Ann Cayao",
		is_available: true,
		is_wl: false
	}
]

const LINEUP = [
	{
		id: "os-1",
		label: "Opening Song",
		artist: null,
		album: null,
		lyrics: null,
		chords: null,
		media: null,
		song: null,
		disabled: false,
		is_solemn: true,
		tags: ["Solemn"]
	},
	{
		id: "ws-1",
		label: "Welcome Song",
		artist: null,
		album: null,
		lyrics: null,
		chords: null,
		media: null,
		song: null,
		disabled: false,
		is_solemn: false,
		tags: ["Joyful"]
	},
	{
		id: "js-1",
		label: "Joyful Song #1",
		artist: null,
		album: null,
		lyrics: null,
		chords: null,
		media: null,
		song: null,
		disabled: false,
		is_solemn: false,
		tags: ["Joyful"]
	},
	{
		id: "js-2",
		label: "Joyful Song #2",
		artist: null,
		album: null,
		lyrics: null,
		chords: null,
		media: null,
		song: null,
		disabled: false,
		is_solemn: false,
		tags: ["Joyful"]
	},
	{
		id: "js-3",
		label: "Joyful Song #3",
		artist: null,
		album: null,
		lyrics: null,
		chords: null,
		media: null,
		song: null,
		disabled: false,
		is_solemn: false,
		tags: ["Joyful"]
	},
	{
		id: "ss-1",
		label: "Solemn Song #1",
		artist: null,
		album: null,
		lyrics: null,
		chords: null,
		media: null,
		song: null,
		disabled: false,
		is_solemn: true,
		tags: ["Solemn"]
	},
	{
		id: "ss-2",
		label: "Solemn Song #2",
		artist: null,
		album: null,
		lyrics: null,
		chords: null,
		media: null,
		song: null,
		disabled: false,
		is_solemn: true,
		tags: ["Solemn"]
	},
	{
		id: "ss-3",
		label: "Solemn Song #3",
		artist: null,
		album: null,
		lyrics: null,
		chords: null,
		media: null,
		song: null,
		disabled: false,
		is_solemn: true,
		tags: ["Solemn"]
	},
	{
		id: "ps-1",
		label: "Pastoral Song",
		artist: null,
		album: null,
		lyrics: null,
		chords: null,
		media: null,
		song: null,
		disabled: false,
		is_solemn: true,
		tags: ["Solemn"]
	},
	{
		id: "vs-1",
		label: "Victory Song",
		artist: null,
		album: null,
		lyrics: null,
		chords: null,
		media: null,
		song: null,
		disabled: false,
		is_solemn: false,
		tags: ["Joyful"]
	},
	{
		id: "cs-1",
		label: "Closing Song",
		artist: null,
		album: null,
		lyrics: null,
		chords: null,
		media: null,
		song: null,
		disabled: false,
		is_solemn: true,
		tags: ["Solemn"]
	}
]

const ASSIGNER = "k4gcy3yNWqa02aUfhw8J4fn7sS63"
const ADMIN = "Hfhcau8TAiXR4T4FEAXp7eipDvz2"

const Glass = theme => ({background: `${theme.palette.background.paper}90`, backdropFilter: "blur(5px)"})

export {VIA, LINEUP, WAN_LOGO, YOUTUBE_LOGO, Glass, ASSIGNER, ADMIN}
