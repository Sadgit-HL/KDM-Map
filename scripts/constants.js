var MAPVERSION = "1.5.4";
var MAPGAME = "Descent2Ed";

var mapWidth = 40;
var mapHeight = 50;

var ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

var HCellSize = 64;
var VCellSize = 64;
var cellType = "SQUARE"; // SQUARE - HEX

//Custom Inputs
var MAX_CustomInputs = 5
var CustomInput_SetTexts = [MAX_CustomInputs - 1];
CustomInput_SetTexts[0] = 'Set HP';
CustomInput_SetTexts[1] = 'Set Stamina';
CustomInput_SetTexts[2] = 'Set ';	//BEWARE :  2 & 3 should be exclusive here as they are on the same space !
CustomInput_SetTexts[3] = 'Set ';
CustomInput_SetTexts[4] = 'Set ';
var CustomInput_ButtonTexts = [MAX_CustomInputs - 1];
CustomInput_ButtonTexts[0] = 'Add HP';
CustomInput_ButtonTexts[1] = 'Add Stamina';
CustomInput_ButtonTexts[2] = 'Add ';	//BEWARE :  2 & 3 should be exclusive here as they are on the same space !
CustomInput_ButtonTexts[3] = 'Add ';
CustomInput_ButtonTexts[4] = 'Add ';

function listsort(a, b) {
	if (a[0] < b[0]) return -1;
	if (a[0] > b[0]) return 1;
	return 0;
}
var bg2e = 'Second Edition Base Game', BoW = 'Bonds of the Wild', CoD = 'Crown of Destiny', CotF = 'Crusade of the Forgotten', GoD = 'Guardians of Deephall',
	LoR = 'Labyrinth of Ruin', LoW = 'Lair of the Wyrm', MoR = 'Manor of Ravens', OotO = 'Oath of the Outcast',
	SoE = 'Shards of Everdark', SoN = 'Shadow of Narekhall', SotS = 'Stewards of the Secret', TF = 'The Trollfens', ToC = 'Treaty of Champions',
	VoD = 'Visions of Dawn', CK = 'Conversion Kit', MoB = 'Mists of Bilehall', CtR = 'The Chains that Rust', SotP = 'Sands of the Past';
var Building = 'Building',
	Cave = 'Cave',
	Civilized = 'Civilized',
	Cold = 'Cold',
	Cursed = 'Cursed',
	Dark = 'Dark',
	Hot = 'Hot',
	Mountain = 'Mountain',
	Water = 'Water',
	Wilderness = 'Wilderness';
var MONSTER_TRAITS = [Building, Cave, Civilized, Cold, Cursed, Dark, Hot, Mountain, Water, Wilderness];
var monsterTraits = {};
for (var i = 0; i < MONSTER_TRAITS.length; i++) {
	monsterTraits[urlize(MONSTER_TRAITS[i])] = urlize(MONSTER_TRAITS[i]);
}

var MasterSuffix = ' master';
var MinionSuffix = ' minion';

var MONSTERS_LIST = [
	
];

var EXPANSIONS = [
	[bg2e, 'Big'],
	[LoR, 'Big'],
	[SoN, 'Big'],
	[LoW, 'Small'],
	[MoR, 'Small'],
	[TF, 'Small'],
	[MoB, 'Small'],
	[CtR, 'Small'],
	[BoW, 'H&M'],
	[CoD, 'H&M'],
	[CotF, 'H&M'],
	[GoD, 'H&M'],
	[OotO, 'H&M'],
	[SoE, 'H&M'],
	[SotS, 'H&M'],
	[ToC, 'H&M'],
	[VoD, 'H&M'],
	[CK, 'CK'],
	[SotP, 'Fan Made']];
var selectedExpansions = {};
var EXPANSION_GROUPS = {};
for (var i = 0; i < EXPANSIONS.length; i++) {
	selectedExpansions[folderize(EXPANSIONS[i][0])] = folderize(EXPANSIONS[i][0]);

	if (EXPANSION_GROUPS[EXPANSIONS[i][1]] == undefined) {
		EXPANSION_GROUPS[EXPANSIONS[i][1]] = [];
	}
	EXPANSION_GROUPS[EXPANSIONS[i][1]].push(EXPANSIONS[i][0]);
}

var CurrentLevel = 0; // values 0 to 7
var ALL_LEVELS = 'Lvl0 Lvl1 Lvl2 Lvl3 Lvl4 Lvl5 Lvl6 Lvl7'
var ImagePathLevel = "";

// ------------------------------------------------------
var ImagePathMapTile = "";

//name,cols width, row height, width delta, height delta
MAP_TILES_LIST_COMPLETE = [
	['Showdown', 8, 6, 100, 32],
	['Acantus Plant', 1, 1, 32, 32],
	['Bug Patch', 1, 1, 32, 32],	
	['Dead Monster', 2, 2, 32, 32],
	['Debris', 1, 1, 32, 32],
	['Giant Stone Face', 3, 2, 32, 32],
	['Nightmare Tree', 3, 3, 32, 32],
	['Ore Vein', 1, 1, 32, 32],
	['Stone Column', 2, 1, 32, 32],
	['Survivor Corpse', 1, 1, 32, 32],
	['Tall Grass', 2, 2, 32, 32],
	['Toppled Pillar', 4, 1, 32, 32]
];

MAP_TILES_LIST = [];
MAP_TILES_SIZES = {};
MAP_TILES_CENTER_ROTATE_CELL = {};

MAP_TILES = {};
for (var i = 0; i < MAP_TILES_LIST_COMPLETE.length; i++) {
	MAP_TILES_LIST.push(MAP_TILES_LIST_COMPLETE[i][0]);
	MAP_TILES_SIZES[MAP_TILES_LIST_COMPLETE[i][0]] = { 'width': MAP_TILES_LIST_COMPLETE[i][1], 'height': MAP_TILES_LIST_COMPLETE[i][2] };
	MAP_TILES_CENTER_ROTATE_CELL[MAP_TILES_LIST_COMPLETE[i][0]] = { 'left': MAP_TILES_LIST_COMPLETE[i][3], 'top': MAP_TILES_LIST_COMPLETE[i][4] };

	var oneItem = {};
	oneItem.title = MAP_TILES_LIST_COMPLETE[i][0];
	oneItem.width = MAP_TILES_LIST_COMPLETE[i][1];
	oneItem.height = MAP_TILES_LIST_COMPLETE[i][2];
	oneItem.left = MAP_TILES_LIST_COMPLETE[i][3];
	oneItem.top = MAP_TILES_LIST_COMPLETE[i][4];
	MAP_TILES[MAP_TILES_LIST_COMPLETE[i][0]] = oneItem;
}

ANGLES_LIST = [
	[0],
	[90],
	[180],
	[270]
];


var LIEUTENANTS_LIST = [
	['Butcher U', 2, 2, 32, 32, true, MoR],
	['Butcher D', 2, 2, 32, 32, true, MoR],
	['Butcher L', 2, 2, 32, 32, true, MoR],
	['Butcher R', 2, 2, 32, 32, true, MoR],
	['Kings Man U', 2, 2, 32, 32, true, MoR],
	['Kings Man D', 2, 2, 32, 32, true, MoR],
	['Kings Man L', 2, 2, 32, 32, true, MoR],
	['Kings Man R', 2, 2, 32, 32, true, MoR],
	['Screaming Antelope U', 2, 2, 32, 32, true, MoR],
	['Screaming Antelope D', 2, 2, 32, 32, true, MoR],
	['Screaming Antelope L', 2, 2, 32, 32, true, MoR],
	['Screaming Antelope R', 2, 2, 32, 32, true, MoR],
	['White Lion U', 2, 2, 32, 32, true, MoR],
	['White Lion D', 2, 2, 32, 32, true, MoR],
	['White Lion L', 2, 2, 32, 32, true, MoR],
	['White Lion R', 2, 2, 32, 32, true, MoR],
];

var LIEUTENANTS = {};

for (var i = 0; i < LIEUTENANTS_LIST.length; i++) {
	var oneItem = {};
	oneItem.title = LIEUTENANTS_LIST[i][0];
	oneItem.width = LIEUTENANTS_LIST[i][1];
	oneItem.height = LIEUTENANTS_LIST[i][2];
	oneItem.top = LIEUTENANTS_LIST[i][3];
	oneItem.left = LIEUTENANTS_LIST[i][4];
	oneItem.hasBack = LIEUTENANTS_LIST[i][5];
	oneItem.expansion = folderize(LIEUTENANTS_LIST[i][6]);
	LIEUTENANTS[LIEUTENANTS_LIST[i][0]] = oneItem;
}

var MONSTERS_HP = [
	['Arachyura', 5, 7, 7, 9],
	['Bandit', 4, 5, 6, 7],
	['Bane Spider', 4, 7, 6, 9],
	['Barghest', 4, 6, 6, 8],
	['Beastman', 4, 5, 5, 6],
	['Blood Ape', 5, 7, 7, 9],
	['Bone Horror', 5, 7, 6, 9],
	['Broodwalker', 7, 10, 8, 12],
	['Burrowing Horror', 7, 9, 10, 12],
	['Carrion Drake', 6, 8, 7, 10],
	['Cave Spider', 3, 5, 5, 7],
	['Changeling', 4, 6, 6, 8],
	['Chaos Beast', 5, 6, 7, 10],
	['Crow Hag', 5, 7, 7, 9],
	['Crypt Dragon', 5, 7, 7, 10],
	['Dark Minotaur', 8, 8, 10, 10],
	['Dark Priest', 2, 5, 7, 9],
	['Deep Elf', 7, 9, 8, 10],
	['Demon Lord', 6, 9, 8, 12],
	['Elemental', 4, 6, 8, 10],
	['Ettin', 5, 8, 7, 9],
	['Ferrox', 4, 5, 5, 8],
	['Fire Imps', 2, 4, 4, 6],
	['Flesh Moulder', 4, 5, 5, 7],
	['Giant', 10, 12, 12, 15],
	['Goblin Archer', 2, 4, 4, 6],
	['Goblin Witcher', 3, 5, 6, 8],
	['Golem', 8, 10, 10, 12],
	['Harpy', 3, 5, 4, 6],
	['Hellhound', 4, 6, 6, 8],
	['Hybrid Sentinel', 5, 8, 6, 9],
	['Ice Wyrm', 7, 9, 11, 14],
	['Ironbound', 8, 10, 10, 12],
	['Kobold', 2, 5, 4, 7],
	['Lava Beetle', 3, 5, 5, 7],
	['Manticore', 5, 7, 7, 9],
	['Marrow Priest', 7, 9, 8, 10],
	['Medusa', 4, 6, 6, 9],
	['Merriod', 5, 7, 7, 9],
	['Sarcophagus Guard', 4, 6, 6, 8],
	['Naga', 4, 5, 6, 7],
	['Ogre', 6, 8, 9, 12],
	['Plague Worm', 5, 7, 6, 9],
	['Rat Swarm', 4, 5, 5, 6],
	['Razorwing', 4, 6, 7, 9],
	['Reanimate', 3, 5, 5, 8],
	['Shade', 2, 4, 4, 6],
	['Shadow Dragon', 6, 9, 8, 10],
	['Shambling Colossus', 5, 8, 7, 9],
	['Skeleton Archer', 3, 6, 4, 8],
	['Sorcerer', 3, 5, 5, 8],
	['The Dispossessed', 6, 8, 8, 10],
	['Troll', 8, 10, 10, 13],
	['Volucrix Reaver', 3, 5, 4, 6],
	['Wendigo', 5, 7, 7, 10],
	['Wraith', 5, 7, 6, 8],
	['Ynfernael Hulk', 8, 9, 9, 10],
	['Zombie', 3, 6, 5, 9],
	['Open Group', 0, 0, 0, 0]
];

MONSTERS = {};

function getMonsterTraits(i) {
	var traitsArray = MONSTERS_LIST[i][7];
	var result = [];
	for (var j = 0; j < traitsArray.length; j++) {
		result.push(urlize(traitsArray[j]));
	}
	return result;
}

for (var i = 0; i < MONSTERS_LIST.length; i++) {
	var oneItem = {};
	oneItem.title = MONSTERS_LIST[i][0];
	oneItem.width = MONSTERS_LIST[i][1];
	oneItem.height = MONSTERS_LIST[i][2];
	oneItem.top = MONSTERS_LIST[i][3];
	oneItem.left = MONSTERS_LIST[i][4];
	oneItem.ranged = MONSTERS_LIST[i][5];
	oneItem.expansion = folderize(MONSTERS_LIST[i][6]);
	oneItem.traits = getMonsterTraits(i);
	oneItem.hasBack = MONSTERS_LIST[i][8];
	oneItem.minionHpActI = MONSTERS_HP[i][1];
	oneItem.masterHpActI = MONSTERS_HP[i][2];
	oneItem.minionHpActII = MONSTERS_HP[i][3];
	oneItem.masterHpActII = MONSTERS_HP[i][4];
	MONSTERS[MONSTERS_LIST[i][0]] = oneItem;
}

SEARCH_ITEMS_LIST = [
];

//Items
var hand = { className: 'hand' };
var twohand = { className: 'hand2' };
var armor = { className: 'armor' };
var item = { className: 'item' };

ITEMS_LIST = [];

TIER2_ITEMS_LIST = [
];

RELICS_LIST = [
];

OVERLORD_RELICS_LIST = [
];

ITEMS = { hand: [], hand2: [], armor: [], item: [] };
ITEMS2 = { hand: [], hand2: [], armor: [], item: [] };
ITEMSR = { hand: [], hand2: [], armor: [], item: [] };

for (var i = 0; i < ITEMS_LIST.length; i++) {
	ITEMS[ITEMS_LIST[i][1].className].push(ITEMS_LIST[i]);
}

for (var i = 0; i < TIER2_ITEMS_LIST.length; i++) {
	ITEMS2[TIER2_ITEMS_LIST[i][1].className].push(TIER2_ITEMS_LIST[i]);
}

for (var i = 0; i < RELICS_LIST.length; i++) {
	ITEMSR[RELICS_LIST[i][1].className].push(RELICS_LIST[i]);
}

TAINTED_CARDS_LIST = [
];

//Classes
var apothecary = {},
	hierophant = {},
	bard = {},
	disciple = {},
	prophet = {},
	spiritspeaker = {},
	watchman = {},
	beastmaster = {},
	berserker = {},
	champion = {},
	knight = {},
	marshal = {},
	skirmisher = {},
	steelcaster = {},
	battlemage = {},
	conjurer = {},
	geomancer = {},
	hexer = {},
	necromancer = {},
	psychic = {},
	runemaster = {},
	bountyHunter = {},
	monk = {},
	stalker = {},
	thief = {},
	treasureHunter = {},
	wildlander = {},
	shadowwalker = {},
	crusader = {},
	heretic = {},
	avenger = {},
	raider = {},
	lorekeeper = {},
	truthseer = {},
	ravager = {},
	trickster = {},
	soulReaper = {},
	elementalist = {};

apothecary.title = 'Apothecary';
bard.title = 'Bard';
crusader.title = 'Crusader';
crusader.allowHybrid = true;
disciple.title = 'Disciple';
heretic.title = 'Heretic';
heretic.allowHybrid = true;
hierophant.title = 'Hierophant';
prophet.title = 'Prophet';
soulReaper.title = 'Soul Reaper';
spiritspeaker.title = 'Spiritspeaker';
watchman.title = 'Watchman';
watchman.allowHybrid = true;

avenger.title = 'Avenger';
avenger.allowHybrid = true;
beastmaster.title = 'Beastmaster';
berserker.title = 'Berserker';
champion.title = 'Champion';
knight.title = 'Knight';
marshal.title = 'Marshal';
raider.title = 'Raider';
raider.allowHybrid = true;
skirmisher.title = 'Skirmisher';
steelcaster.title = 'Steelcaster';
steelcaster.allowHybrid = true;

battlemage.title = 'Battlemage';
battlemage.allowHybrid = true;
conjurer.title = 'Conjurer';
elementalist.title = 'Elementalist';
geomancer.title = 'Geomancer';
hexer.title = 'Hexer';
lorekeeper.title = 'Lorekeeper';
lorekeeper.allowHybrid = true;
necromancer.title = 'Necromancer';
psychic.title = 'Psychic';
runemaster.title = 'Runemaster';
truthseer.title = 'Truthseer';
truthseer.allowHybrid = true;

bountyHunter.title = 'Bounty Hunter';
shadowwalker.title = 'Shadow Walker';
monk.title = 'Monk';
monk.allowHybrid = true;
ravager.title = 'Ravager';
ravager.allowHybrid = true;
stalker.title = 'Stalker';
thief.title = 'Thief';
treasureHunter.title = 'Treasure Hunter';
trickster.title = 'Trickster';
trickster.allowHybrid = true;
wildlander.title = 'Wildlander';


//Skills
apothecary.skills = [
	
];

avenger.skills = [
];

bard.skills = [
];

battlemage.skills = [
	['Arcane Veteran', 0],
	['Death Siphon', 3],
	['Planar Weapon', 1],
	['Runic Weave', 2]
];

beastmaster.skills = [
	['Predator', 3],
	['Changing Skins', 3],
	['Shadow Hunter', 2],
	['Savagery', 2],
	['Feral Frenzy', 2],
	['Survivalist', 1],
	['Stalker', 1],
	['Bestial Rage', 1],
	['Bound by the Hunt', 0],
	['Wolf', 0],
	['Skinning Knife', 0, hand],
	['Hunting Spear', 0, hand]
];

berserker.skills = [
	['Execute', 3],
	['Death Rage', 3],
	['Whirlwind', 2],
	['Weapon Mastery', 2],
	['Charge', 2],
	['Cripple', 1],
	['Counter Attack', 1],
	['Brute', 1],
	['Rage', 0],
	['Chipped Greataxe', 0, twohand]
];

bountyHunter.skills = [
	['Chosen Target', 0],
	['Dark Iron Chains', 2],
	['Double Crossbow', 0, twohand],
	['Evil Eye', 2],
	['Lie In Wait', 1],
	['Longshot', 1],
	['Not So Fast', 1],
	['Payday', 3],
	['Rapid Fire', 3],
	['Undercover', 2]
];

champion.skills = [
	['A Living Legend', 1],
	['For The Cause', 3],
	['Glory Of Battle', 1],
	['Horn Of Courage', 0, item],
	['Inspiring Presence', 1],
	['Motivating Charge', 2],
	['No Mercy', 2],
	['Stoic Resolve', 2],
	['Valor Of Heroes', 0],
	['Valorous Strike', 3],
	['Worn Greatsword', 0, twohand]
];

conjurer.skills = [
	['Blinding Light', 2],
	['Channeling', 0],
	['Focus Fire', 2],
	['Illusory Path', 1],
	['Many Friends', 1],
	['Mirror Image', 0],
	['Prismatic Assault', 3],
	['Prismatic Staff', 0, twohand],
	['Refraction', 1],
	['Sleight Of Mind', 2],
	['Vortex', 3]
];

crusader.skills = [
	['Chosen of Kellos', 0],
	['Divine Light', 3],
	['Righteous', 2],
	['Zealous Aura', 1]
];

disciple.skills = [
	['Armor Of Faith', 1],
	['Blessed Strike', 1],
	['Cleansing Touch', 1],
	['Divine Fury', 2],
	['Holy Power', 3],
	['Iron Mace', 0, hand],
	['Prayer Of Healing', 0],
	['Prayer Of Peace', 2],
	['Radiant Light', 3],
	['Time Of Need', 2],
	['Wooden Shield', 0, hand]
];

elementalist.skills = [
	['Blaze', 1],
	['Earth and Sky', 1],
	['Elemental Focus', 0],
	['Grasp', 1],
	['Gust', 1],
	['Natures Embrace', 3],
	['Natures Fury', 3],
	['Primal Harmony', 1],
	['Runeshard Cache', 0, item],
	['Spire of Conflux', 0, twohand],
	['Spiritual Balance', 2],
	['Storms Fury', 2],
	['Sun and Sea', 1],
	['Tide', 1],
	['Volcanic Might', 2]
];

geomancer.skills = [
	['Cataclysm', 3],
	['Earthen Anguish', 1],
	['Gravity Spike', 3],
	['Ley Line', 2],
	['Molten Fury', 2],
	['Quaking Word', 1],
	['Stasis Rune', 0, twohand],
	['Stone Tongue', 1],
	['Summoned Stone', 0],
	['Terracall', 0],
	['Ways Of Stone', 2]
];

heretic.skills = [
	['Arcane Healing', 1],
	['Dark Recovery', 2],
	['Exiled Visionary', 0],
	['Forbidden Arts', 3]
];

hexer.skills = [
	['Accursed Arms', 3],
	['Affliction', 1],
	['Crippling Curse', 2],
	['Enfeebling Hex', 0],
	['Fel Command', 2],
	['Internal Rot', 2],
	['Plague Cloud', 3],
	['Plague Spasm', 1],
	['Staff Of The Grave', 0, twohand],
	['Viral Hex', 1]
];

hierophant.skills = [
	['Ceremonial Staff', 0, hand],
	['Embalming Ritual', 0],
	['Eternal Service', 1],
	['Gift of the Desert', 3],
	['Hymn', 1],
	['Path of Prophecy', 1],
	['Royal Guard', 3],
	['Sacred Scriptures', 0, item],
	['Sands of Vengance', 2],
	['Shroud of Respite', 2],
	['Words of Wisdom', 2]
];

knight.skills = [
	['Advance', 1],
	['Challenge', 1],
	['Defend', 1],
	['Defense Training', 2],
	['Guard', 2],
	['Inspiration', 3],
	['Iron Longsword', 0, hand],
	['Oath Of Honor', 0],
	['Shield Slam', 2],
	['Stalwart', 3],
	['Wooden Shield', 0, hand]
];

lorekeeper.skills = [
	['All Knowing', 3],
	['Ancient Remedy', 1],
	['Careful Balance', 2],
	['Interdisciplinary', 0]
];

marshal.skills = [
	['By The Book', 2],
	['By The Book Coop', 2],
	['Crushing Blow', 3],
	['I Am The Law', 2],
	['Just Reward', 1],
	['Just Reward Coop', 1],
	['Last Stand', 3],
	['Retribution', 0],
	['Shockwave', 1],
	['Signet Ring', 0, item],
	['Vigilant Watch', 2],
	['War Hammer', 0, twohand],
	['Zealous Fire', 1],
	['Zealous Fire Coop', 1]
];

monk.skills = [
	['Greater calling', 0],
	['Inner Balance', 1],
	['Openhanded', 2],
	['Vow Of Freedom', 3]
];

necromancer.skills = [
	['Army Of Death', 3],
	['Corpse Blast', 1],
	['Dark Pact', 2],
	['Deathly Haste', 1],
	['Dying Command', 3],
	['Fury Of Undeath', 1],
	['Raise Dead', 0],
	['Reanimate', 0],
	['Reapers Scythe', 0, twohand],
	['Undead Might', 2],
	['Vampiric Blood', 2]
];

prophet.skills = [
	['All Seeing', 2],
	['Battle Vision', 1],
	['Focused Insights', 3],
	['Forewarning', 1],
	['Grim Fate', 1],
	['Iron Flail', 0, hand],
	['Lifeline', 2],
	['Omniscience', 3],
	['Sages Tome', 0, item],
	['Soothing Insight', 0],
	['Victory Foretold', 2]
];

psychic.skills = [
	['Mental Assault', 0],
	['Prescience', 1],
	['Prescience Coop', 1],
	['Empathic Resolve', 1],
	['Overload', 1],
	['Possession', 2],
	['Reaching Out', 2],
	['Mental Fortitude', 2],
	['Mind over Matter', 3],
	['Towering Intellect', 3],
	['Minds Eye Turban', 0, item],
	['Shadow Darts', 0, hand]


];

raider.skills = [
	['Close the Gap', 3],
	['Divide the Spoils', 2],
	['Into the Fray', 0],
	['Surprise Assault', 1]
];

ravager.skills = [
	['Battle Hardened', 0],
	['Charging Assault', 2],
	['Momentum', 1],
	['Vicious Throw', 3]
];

runemaster.skills = [
	['Arcane Bolt', 0, twohand],
	['Break The Rune', 3],
	['Exploding Rune', 1],
	['Ghost Armor', 1],
	['Inscribe Rune', 1],
	['Iron Will', 2],
	['Quick Casting', 3],
	['Rune Mastery', 2],
	['Runic Knowledge', 0],
	['Runic Sorcery', 2]
];

shadowwalker.skills = [
	['Dark Servant', 1],
	['Dark Shift', 2],
	['Endless Void', 2],
	['Faithful Friend', 1],
	['Feathered Hatchet', 0, hand],
	['Otherworldly', 2],
	['Shadow Puppet', 3],
	['Shadow Soul', 0],
	['Shadow Step', 3],
	['Soul Bound', 0],
	['Through The Veil', 1],
	['Tribal Cloak', 0, armor]
];

skirmisher.skills = [
	['Back In Action', 1],
	['Born In Battle', 2],
	['Carve A Path', 3],
	['Deep Wounds', 1],
	['Dual Strike', 0],
	['Ever In Motion', 2],
	['Jagged Handaxe', 0, hand],
	['Keen Edge', 1],
	['Rusted Handaxe', 0, hand],
	['Unrelenting', 2],
	['Unstoppable', 3]
];

soulReaper.skills = [
	['Blight Extraction', 1],
	['Cursed Soul', 2],
	['Essence Harvest', 0],
	['Ethereal Armor', 2],
	['Font of Vitality', 3],
	['Galvanize', 2],
	['Harvester Scythe', 0, hand],
	['Mirror of Souls', 0, item],
	['Reapers Pact', 3],
	['Spirit Link', 1],
	['Stream of Life', 0],
	['Unholy Bond', 1]
];

spiritspeaker.skills = [
	['Ancestor Spirits', 3],
	['Cloud Of Mist', 2],
	['Drain Spirit', 1],
	['Healing Rain', 1],
	['Natures Bounty', 2],
	['Oak Staff', 0, twohand],
	['Shared Pain', 1],
	['Stoneskin', 0],
	['Tempest', 2],
	['Vigor', 3]
];

stalker.skills = [
	['Ambush', 3],
	['Black Widows Web', 0, hand],
	['Easy Prey', 2],
	['Exploit', 1],
	['Hunters Mark', 1],
	['Hunting Knife', 0, hand],
	['Lay Of The Land', 2],
	['Makeshift Trap', 1],
	['Poison Barbs', 2],
	['Set Trap', 0],
	['Upper Hand', 3]
];

steelcaster.skills = [
	['Iron Blooded', 3],
	['Rune Grafting', 1],
	['Runeguard', 0],
	['Shield Mage', 2]
];

thief.skills = [
	['Appraisal', 1],
	['Bushwhack', 3],
	['Caltrops', 2],
	['Dirty Tricks', 1],
	['Greedy', 0],
	['Lucky-Charm', 0, item],
	['Lurk', 3],
	['Sneaky', 1],
	['Throwing Knives', 0, hand],
	['Tumble', 2],
	['Unseen', 2]
];

treasureHunter.skills = [
	['Delver', 0],
	['Dungeoneer', 1],
	['Finders Keepers', 3],
	['Gold Rush', 1],
	['Guard The Spoils', 2],
	['Leather Whip', 0, hand],
	['Lure Of Fortune', 2],
	['Sleight Of Hand', 2],
	['Survey', 1],
	['The Dead Mans Compass', 0, item],
	['Trail Of Riches', 3]
];

trickster.skills = [
	['Arcane Fusion', 3],
	['Now You See Me', 2],
	['Private Collection', 1],
	['Razzle Dazzle', 0]
];

truthseer.skills = [
	['Clairvoyance', 0],
	['Premonition', 3],
	['Translocation', 2],
	['True Sight', 1]
];

watchman.skills = [
	['Quick Recovery', 1],
	['Trailblazer', 2],
	['Unity', 3],
	['Vigilance', 0]
];

wildlander.skills = [
	['Accurate', 1],
	['Black Arrow', 3],
	['Bow Mastery', 2],
	['Danger Sense', 1],
	['Eagle Eyes', 1],
	['First Strike', 2],
	['Fleet Of Foot', 2],
	['Nimble', 0],
	['Running Shot', 3],
	['Yew Shortbow', 0, twohand]
];


//Archetypes
var wiz = {},
	war = {},
	rog = {},
	sup = {};

wiz.title = 'Mage';
wiz.classes = [battlemage, conjurer, elementalist, geomancer, hexer, lorekeeper, necromancer, psychic, runemaster, truthseer];
war.title = 'Warrior';
war.classes = [avenger, beastmaster, berserker, champion, knight, marshal, raider, skirmisher, steelcaster];
rog.title = 'Scout';
rog.classes = [bountyHunter, monk, ravager, shadowwalker, stalker, thief, treasureHunter, trickster, wildlander];
sup.title = 'Healer';
sup.classes = [apothecary, bard, crusader, disciple, heretic, hierophant, prophet, soulReaper, spiritspeaker, watchman];

var ARCHETYPE_CLASSES = 'mage warrior scout healer';
var ARCHETYPES_LIST = [wiz, war, rog, sup];

var CLASSES = {};
var ARCHETYPES = {};
var CLASSES_ITEMS = [];

for (var i = 0; i < ARCHETYPES_LIST.length; i++) {
	for (var j = 0; j < ARCHETYPES_LIST[i].classes.length; j++) {
		var classObject = ARCHETYPES_LIST[i].classes[j];
		classObject.archetype = ARCHETYPES_LIST[i];
		CLASSES[classObject.title] = classObject;
		for (var k = 0; k < classObject.skills.length; k++) {
			if (classObject.skills[k][2] != undefined) {
				var classItem = [];
				classItem[0] = classObject.skills[k][0];
				classItem[1] = classObject.title.replace(new RegExp(" ", 'g'), '').toLowerCase();
				classItem[2] = classObject.skills[k][2];
				CLASSES_ITEMS.push(classItem);
			}
		}
	}
	ARCHETYPES[ARCHETYPES_LIST[i].title] = ARCHETYPES_LIST[i];
}

// Hybrid classes options
avenger.newArchetype = sup;
lorekeeper.newArchetype = sup;
monk.newArchetype = sup;
raider.newArchetype = rog;
truthseer.newArchetype = rog;
watchman.newArchetype = rog;
heretic.newArchetype = wiz;
steelcaster.newArchetype = wiz;
trickster.newArchetype = wiz;
battlemage.newArchetype = war;
crusader.newArchetype = war;
ravager.newArchetype = war;

var HYBRID_CLASSES = [avenger, lorekeeper, monk, raider, truthseer, watchman, heretic, steelcaster, trickster, battlemage, crusader, ravager];

//Heroes
var MAX_Heroes = 4
var HEROES_LIST = [
	['survivor 1', 1, 1, 32, 32, 1, 1, rog],
	['survivor 2', 1, 1, 32, 32, 1, 1, rog],
	['survivor 3', 1, 1, 32, 32, 1, 1, rog],
	['survivor 4', 1, 1, 32, 32, 1, 1, rog],
	['survivor 5', 1, 1, 32, 32, 1, 1, rog],
	['survivor 6', 1, 1, 32, 32, 1, 1, rog],
	['survivor 7', 1, 1, 32, 32, 1, 1, rog],
	['survivor 8', 1, 1, 32, 32, 1, 1, rog],
];

var HEROES = {};

for (var i = 0; i < HEROES_LIST.length; i++) {
	var oneItem = {};
	oneItem.title = HEROES_LIST[i][0];
	oneItem.width = HEROES_LIST[i][1];
	oneItem.height = HEROES_LIST[i][2];
	oneItem.top = HEROES_LIST[i][3];
	oneItem.left = HEROES_LIST[i][4];
	oneItem.hp = HEROES_LIST[i][5];
	oneItem.stamina = HEROES_LIST[i][6];
	oneItem.archetype = HEROES_LIST[i][7];
	HEROES[HEROES_LIST[i][0]] = oneItem;
}

MONSTERS_LIST.sort(listsort);
HEROES_LIST.sort(listsort);

ALLIES_LIST = [
	['Serena', 1, 1, 32, 32, true],
	['Raythen', 1, 1, 32, 32, true]
];

var ALLIES = {};

for (var i = 0; i < ALLIES_LIST.length; i++) {
	var oneItem = {};
	oneItem.title = ALLIES_LIST[i][0];
	oneItem.width = ALLIES_LIST[i][1];
	oneItem.height = ALLIES_LIST[i][2];
	oneItem.top = ALLIES_LIST[i][3];
	oneItem.left = ALLIES_LIST[i][4];
	oneItem.hasCard = ALLIES_LIST[i][5];
	ALLIES[ALLIES_LIST[i][0]] = oneItem;
}

ALLIES_SKILLS = {};
ALLIES_SKILLS['Serena'] = ['Aura Of Might', 'Healing Aura', 'Holy Hammer'];
ALLIES_SKILLS['Raythen'] = ['Back Strike', 'Night Prowler', 'Sharp Eyes'];

FAMILIARS_LIST = [
	['Brightblaze', 1, 1, 32, 32, true],
	['Mirror Image', 1, 1, 32, 32, true],
	['Pico', 1, 1, 32, 32, true],
	['Raven Flock', 1, 1, 32, 32, true],
	['Reanimate', 1, 1, 32, 32, true],
	['Scourge', 1, 1, 32, 32, true],
	['Shadow Soul', 1, 1, 32, 32, true],
	['Skye', 1, 1, 32, 32, true],
	['Summoned Stone', 1, 1, 32, 32, true],
	['Trap', 1, 1, 32, 32, false],
	['Wolf', 1, 1, 32, 32, true],
	['Bandaged Servant', 1, 1, 32, 32, true]
];

var FAMILIARS = {};

for (var i = 0; i < FAMILIARS_LIST.length; i++) {
	var oneItem = {};
	oneItem.title = FAMILIARS_LIST[i][0];
	oneItem.width = FAMILIARS_LIST[i][1];
	oneItem.height = FAMILIARS_LIST[i][2];
	oneItem.top = FAMILIARS_LIST[i][3];
	oneItem.left = FAMILIARS_LIST[i][4];
	oneItem.hasCard = FAMILIARS_LIST[i][5];
	FAMILIARS[FAMILIARS_LIST[i][0]] = oneItem;
}

VILLAGERS_LIST = [
	['Villager Female', 1, 1, 32, 32, false],
	['Villager Male', 1, 1, 32, 32, false]
];

var VILLAGERS = {};

for (var i = 0; i < VILLAGERS_LIST.length; i++) {
	var oneItem = {};
	oneItem.title = VILLAGERS_LIST[i][0];
	oneItem.width = VILLAGERS_LIST[i][1];
	oneItem.height = VILLAGERS_LIST[i][2];
	oneItem.top = VILLAGERS_LIST[i][3];
	oneItem.left = VILLAGERS_LIST[i][4];
	oneItem.hasCard = VILLAGERS_LIST[i][5];
	VILLAGERS[VILLAGERS_LIST[i][0]] = oneItem;
}

DOORS_LIST = [
	['Yellow Door', 2, 1, 32, 32],
	['Red Door', 2, 1, 32, 32],
	['Overgrowth', 2, 1, 32, 32],
	['Portcullis', 2, 1, 32, 32],
	['Old Wall', 2, 1, 32, 32]
];
DOORS = {};
for (var i = 0; i < DOORS_LIST.length; i++) {
	var oneItem = {};
	oneItem.title = DOORS_LIST[i][0];
	oneItem.width = DOORS_LIST[i][1];
	oneItem.height = DOORS_LIST[i][2];
	oneItem.left = DOORS_LIST[i][3];
	oneItem.top = DOORS_LIST[i][4];
	DOORS[DOORS_LIST[i][0]] = oneItem;
}


BLOCKS_LIST = [
	['1x1 blue', 1, 1, 32, 32],
	['1x1 green', 1, 1, 32, 32],
	['1x1 red', 1, 1, 32, 32],
	['1x1 yellow', 1, 1, 32, 32],
	['2x2 blue', 2, 2, 32, 32],
	['2x2 green', 2, 2, 32, 32],
	['2x2 red', 2, 2, 32, 32],
	['2x2 yellow', 2, 2, 32, 32]
];
BLOCKS = {};
for (var i = 0; i < BLOCKS_LIST.length; i++) {
	var oneItem = {};
	oneItem.title = BLOCKS_LIST[i][0];
	oneItem.width = BLOCKS_LIST[i][1];
	oneItem.height = BLOCKS_LIST[i][2];
	oneItem.left = BLOCKS_LIST[i][3];
	oneItem.top = BLOCKS_LIST[i][4];
	BLOCKS[BLOCKS_LIST[i][0]] = oneItem;
}

MAPTOKENS = {};

OBJECTIVES_LIST = [
	['Acantus Plant', 1, 1, 32, 32],
	['Bug Patch', 1, 1, 32, 32],	
	['Dead Monster', 1, 1, 32, 32],
	['Debris', 1, 1, 32, 32],
	['Giant Stone Face', 1, 1, 32, 32],
	['Nightmare Tree', 1, 1, 32, 32],
	['Ore Vein', 1, 1, 32, 32],
	['Stone Column', 1, 1, 32, 32],
	['Survivor Corpse', 1, 1, 32, 32],
	['Tall Grass', 2, 3, 32, 32],
	['Toppled Pillar', 1, 1, 32, 32]
];
OBJECTIVES = {};
for (var i = 0; i < OBJECTIVES_LIST.length; i++) {
	var oneItem = {};
	oneItem.title = OBJECTIVES_LIST[i][0];
	oneItem.width = OBJECTIVES_LIST[i][1];
	oneItem.height = OBJECTIVES_LIST[i][2];
	oneItem.left = OBJECTIVES_LIST[i][3];
	oneItem.top = OBJECTIVES_LIST[i][4];
	OBJECTIVES[OBJECTIVES_LIST[i][0]] = oneItem;
	MAPTOKENS[OBJECTIVES_LIST[i][0]] = oneItem;
}

MISCELLANEOUS_LIST = [
	['Challenge', 1, 1, 32, 32],
	['Fatigue', 1, 1, 32, 32],
	['Search', 1, 1, 32, 32],
	['Secret Entrance Indoors', 1, 1, 32, 32],
	['Secret Entrance Outdoors', 1, 1, 32, 32],
	['Sun Stone', 1, 1, 32, 32]
];
MISCELLANEOUS = {};
for (var i = 0; i < MISCELLANEOUS_LIST.length; i++) {
	var oneItem = {};
	oneItem.title = MISCELLANEOUS_LIST[i][0];
	oneItem.width = MISCELLANEOUS_LIST[i][1];
	oneItem.height = MISCELLANEOUS_LIST[i][2];
	oneItem.left = MISCELLANEOUS_LIST[i][3];
	oneItem.top = MISCELLANEOUS_LIST[i][4];
	MISCELLANEOUS[MISCELLANEOUS_LIST[i][0]] = oneItem;
	MAPTOKENS[MISCELLANEOUS_LIST[i][0]] = oneItem;
}

CONDITIONS_INITIAL = [
	['Bleeding', true, false],
	['Blind', true, false],
	['Burning', true, false],
	['Cursed', true, false],
	['Diseased', true, false],
	['Doomed', true, false],
	['Immobilized', true, false],
	['Poisoned', true, false],
	['Stunned', true, false],
	['Terrified', true, false],
	['Weakened', true, false],
	['Elixir', false, true],
	['Fortune', false, true],
	['Hexed', false, true],
	['Infected', false, true],
	['Insight', false, false],
	['Timmorran Shard', false, true],
	['Tracked', false, false],
	['Objective', false, true],
	['Threat', false, true],
	['Valor', false, true],
	['Healer', false, true],
	['Mage', false, true],
	['Scout', false, true],
	['Warrior', false, true]
];

var CONDITIONS = {};
var CONDITIONS_LIST = [];

for (var i = 0; i < CONDITIONS_INITIAL.length; i++) {
	CONDITIONS_LIST.push(CONDITIONS_INITIAL[i][0]);
	CONDITIONS[CONDITIONS_INITIAL[i][0]] = { 'hasConditionCard': CONDITIONS_INITIAL[i][1], 'canApplyMultipleTimes': CONDITIONS_INITIAL[i][2] };
}

//Name, has image, can have many
TRACKING_TOKENS_INITIAL = [
	['Bleeding', true, false],
	['Blind', true, false],
	['Burning', true, false],
	['Cursed', true, false],
	['Diseased', true, false],
	['Doomed', true, false],
	['Immobilized', true, false],
	['Poisoned', true, false],
	['Stunned', true, false],
	['Terrified', true, false],
	['Weakened', true, false],
	['Elixir', false, true],
	['Fortune', false, true],
	['Hexed', false, true],
	['Infected', false, true],
	['Insight', false, false],
	['Timmorran Shard', false, true],
	['Tracked', false, false],
	['Objective', false, true],
	['Threat', false, true],
	['Valor', false, true],
	['Healer', false, true],
	['Mage', false, true],
	['Scout', false, true],
	['Warrior', false, true]
];

var TRACKING_TOKENS = {};
var TRACKING_TOKENS_LIST = [];

for (var i = 0; i < TRACKING_TOKENS_INITIAL.length; i++) {
	TRACKING_TOKENS_LIST.push(TRACKING_TOKENS_INITIAL[i][0]);
	TRACKING_TOKENS[TRACKING_TOKENS_INITIAL[i][0]] = { 'hasConditionCard': TRACKING_TOKENS_INITIAL[i][1], 'canApplyMultipleTimes': TRACKING_TOKENS_INITIAL[i][2] };
}


OVERLORD_CARDS_LIST = [
	['Critical Blow', 'Basic', 1, ''],
	['Dark Charm', 'Basic', 1, ''],
	['Dark Fortune', 'Basic', 2, ''],
	['Dark Might', 'Basic', 2, ''],
	['Dash', 'Basic', 2, ''],
	['Frenzy', 'Basic', 2, ''],
	['Pit Trap', 'Basic', 1, ''],
	['Poison Dart', 'Basic', 1, ''],
	['Tripwire', 'Basic', 2, ''],
	['Word Of Misery', 'Basic', 1, ''],
	['Befuddle', 'Basic2', 2, ''],
	['Blinding Speed', 'Basic2', 2, ''],
	['Dirty Fighting', 'Basic2', 2, ''],
	['Flurry', 'Basic2', 1, ''],
	['Grease Trap', 'Basic2', 1, ''],
	['Mental Error', 'Basic2', 1, ''],
	['Mimic', 'Basic2', 1, ''],
	['Overwhelm', 'Basic2', 1, ''],
	['Reflective Ward', 'Basic2', 1, ''],
	['Sign Of Weakness', 'Basic2', 1, ''],
	['Uncontrolled Power', 'Basic2', 2, ''],
	['Dragonbone Pendant', 'Enchanter', 1, '1'],
	['Elixir Of Stone', 'Enchanter', 1, '1'],
	['Rings Of ZholAlam', 'Enchanter', 1, '1'],
	['Wristlet Of Wind', 'Enchanter', 1, '1'],
	['Rune Of The Phoenix', 'Enchanter', 1, '2'],
	['Ward Of Peace', 'Enchanter', 1, '2'],
	['Sign Of The Last Zenith', 'Enchanter', 1, '3'],
	['Adaptive Contagion', 'Infector', 1, '1'],
	['Airborne', 'Infector', 1, '1'],
	['Contaminated', 'Infector', 1, '1'],
	['Virulent Infection', 'Infector', 1, '1'],
	['Outbreak', 'Infector', 1, '2'],
	['Tainted Blow', 'Infector', 1, '2'],
	['Dark Host', 'Infector', 1, '3'],
	['Unholy Ritual', 'Magus', 2, '1'],
	['Word Of Pain', 'Magus', 2, '1'],
	['Rise Again', 'Magus', 1, '2'],
	['Word Of Despair', 'Magus', 1, '2'],
	['Diabolic Power', 'Magus', 1, '3'],
	['No Rest For The Wicked', 'Punisher', 2, '1'],
	['Trading Pains', 'Punisher', 2, '1'],
	['Exploit Weakness', 'Punisher', 1, '2'],
	['Price Of Prevention', 'Punisher', 1, '2'],
	['Blood Bargaining', 'Punisher', 1, '3'],
	['Explosive Runes', 'Saboteur', 2, '1'],
	['Web Trap', 'Saboteur', 2, '1'],
	['Curse Of The Monkey God', 'Saboteur', 1, '2'],
	['Wicked Laughter', 'Saboteur', 1, '2'],
	['Uthuk Demon Trap', 'Saboteur', 1, '3'],
	['Imploding Rift', 'Shadowmancer', 1, '1'],
	['Mistrust', 'Shadowmancer', 1, '1'],
	['Out Of Darkness', 'Shadowmancer', 1, '1'],
	['Shadow Of Doubt', 'Shadowmancer', 1, '1'],
	['Black Out', 'Shadowmancer', 1, '2'],
	['Shadow Walk', 'Shadowmancer', 1, '2'],
	['Treacherous Shadows', 'Shadowmancer', 1, '3'],
	['Dark Silhouette', 'Soulbinder', 1, '1'],
	['Grotesque', 'Soulbinder', 1, '1'],
	['Possessive', 'Soulbinder', 1, '1'],
	['Restless Spirit', 'Soulbinder', 1, '1'],
	['Ties That Bind', 'Soulbinder', 1, '1'],
	['Haunted Steps', 'Soulbinder', 1, '2'],
	['Unblinking', 'Soulbinder', 1, '2'],
	['Danse Macabre', 'Soulbinder', 1, '3'],
	['Beneath The Shadow', 'Unkindness', 1, '1'],
	['Beware', 'Unkindness', 1, '1'],
	['Call Of The Ravens', 'Unkindness', 1, '1'],
	['Feast', 'Unkindness', 1, '1'],
	['Ill Omen', 'Unkindness', 1, '1'],
	['Imitation', 'Unkindness', 1, '2'],
	['Sudden Flurry', 'Unkindness', 1, '2'],
	['Envelop', 'Unkindness', 1, '3'],
	['Blood Rage', 'Warlord', 2, '1'],
	['Dark Fortitude', 'Warlord', 2, '1'],
	['Bloodlust', 'Warlord', 1, '2'],
	['Expert Blow', 'Warlord', 1, '2'],
	['Reinforce', 'Warlord', 1, '3'],
	['Dark Remedy', 'Universal', 2, '1'],
	['Dark Resilience', 'Universal', 1, '1'],
	['Placebo', 'Universal', 1, '1'],
	['Plan Ahead', 'Universal', 2, '1'],
	['Refresh', 'Universal', 1, '1'],
	['Schemes', 'Universal', 1, '1'],
	['Solidarity', 'Universal', 1, '1'],
	['Upgrade', 'Universal', 1, '1'],
	['Diverse Means', 'Universal', 1, '2'],
	['Down And Out', 'Overlord Reward', 1, ''],
	['Endless Supply', 'Overlord Reward', 1, ''],
	['Fire Gems', 'Overlord Reward', 1, ''],
	['Forgotten Sorcery', 'Overlord Reward', 1, ''],
	['Hags Hunger', 'Overlord Reward', 1, ''],
	['Hard Knocks', 'Overlord Reward', 1, ''],
	['Hunk of Junk', 'Overlord Reward', 1, ''],
	['Mockery', 'Overlord Reward', 1, ''],
	['Offertory Affliction', 'Overlord Reward', 1, ''],
	['Power in Numbers', 'Overlord Reward', 1, ''],
	['Secrets of Flesh', 'Overlord Reward', 1, ''],
	['Splice', 'Overlord Reward', 1, ''],
	['Spligs Revenge', 'Overlord Reward', 1, ''],
	['The Wyrm Queens Favor', 'Overlord Reward', 1, ''],
	['Toxic Reprisal', 'Overlord Reward', 1, ''],
	['Twin Souls', 'Overlord Reward', 1, ''],
	['Unbroken', 'Overlord Reward', 1, ''],
	['Unseen Wings', 'Overlord Reward', 1, ''],
];

var OVERLORD_CARDS = {};

for (var i = 0; i < OVERLORD_CARDS_LIST.length; i++) {
	var oneItem = {};
	oneItem.title = OVERLORD_CARDS_LIST[i][0];
	oneItem.number = OVERLORD_CARDS_LIST[i][2];
	oneItem.xp = OVERLORD_CARDS_LIST[i][3];
	if (OVERLORD_CARDS[OVERLORD_CARDS_LIST[i][1]] == undefined) {
		OVERLORD_CARDS[OVERLORD_CARDS_LIST[i][1]] = [];
	}
	OVERLORD_CARDS[OVERLORD_CARDS_LIST[i][1]].push(oneItem);
}

CORRUPTED_CITIZEN_CARDS = [
	'The Civilian',
	'The Executioner',
	'The Guardsman',
	'The Hero',
	'The Mage',
	'The Magistrate',
	'The Scholar',
	'The Scoundrel',
	'The Siren'
];

var PLOT_DECKS = [
	['Burning Ambition', [
		['Blazing Rage', 3, 1],
		['Crushing Exhaustion', 3, 2],
		['Demons Bargain', 3, 0],
		['Enkindle', 1, 1],
		['Inferno', 0, 2],
		['Scorching Presence', 2, 1],
		['Shifting Earth', 2, 1],
		['Summon Gargan Mirklace', 3, 2],
		['Taste Of The Forbidden', 2, 0],
		['Ynfernael Bonds', 2, 1]]],
	['Cursed By Power', [
		['Bolt From The Blue', 3, 1],
		['Cabal', 4, 1],
		['Dark Pact', 0, 0],
		['Greater Power', 2, 1],
		['Masques', 2, 1],
		['Mystic Might', 3, 1],
		['Summon Merick', 3, 2],
		['Thaumaturgy', 3, 1],
		['The Dark Mark', 2, 0],
		['The Grasping Grave', 2, 2]]],
	['Dark Illusions', [
		['Darkness Falls', 3, 1],
		['Enthrall', 2, 1],
		['Intricate Schemes', 1, 0],
		['Malediction', 2, 1],
		['Mirage', 2, 1],
		['Misdirection', 0, 1],
		['Phantasm', 3, 1],
		['Summon Ariad', 3, 2],
		['Tainted Blood', 1, 1],
		['The Ritual Continues', 4, 0]]],
	['Dragons Greed', [
		['Aurium Plating', 3, 2],
		['Guardians Of The Hoard', 4, 0],
		['Iron-Hard Scales', 2, 1],
		['Jealous Rage', 3, 2],
		['Massive Bulk', 3, 1],
		['Mine All Mine', 0, 0],
		['Punish The Weak', 3, 1],
		['Summon Valyndra', 3, 2],
		['Terrifying Presence', 2, 1],
		['Valyndras Shadow', 4, 1]]],
	['Endless Thirst', [
		['Bad Dreams', 1, 1],
		['Bloodline', 0, 0],
		['Fangs In The Dark', 2, 1],
		['Nights Embrace', 2, 1],
		['Nighttime Hunt', 3, 1],
		['Scent Of Blood', 3, 1],
		['Summon Eliza', 3, 2],
		['The Ladys Care', 3, 1],
		['The Power Of Blood', 2, 1],
		['The Taste Of Suffering', 3, 1]]],
	['Goblin Uprising', [
		['Dive Into Cover', 3, 1],
		['Emergency Rations', 2, 1],
		['Goblin Ambush', 3, 1],
		['Meat Shield', 2, 1],
		['Overfed', 2, 1],
		['Raided Armory', 4, 2],
		['Scavenge', 4, 1],
		['Spirited Retreat', 0, 1],
		['Summon Splig', 3, 2]]],
	['Hybrid Loyalty', [
		['Bribery', 2, 2],
		['Cut A Deal', 2, 0],
		['Dual Training', 0, 1],
		['End It', 2, 1],
		['Fight With Honor', 2, 0],
		['Hazard Pay', 4, 0],
		['Make Our Own Luck', 2, 1],
		['Resourceful', 3, 1],
		['Show Of Force', 2, 1],
		['Summon Belthir', 2, 3]]],
	['Inner Corruption', [
		['Deceitful Scribe', 3, 0],
		['False Informant', 3, 0],
		['Friend Or Foe', 0, 1],
		['Mages Guild', 4, 1],
		['Merchants Guild', 2, 0],
		['One Of Us', 3, 2],
		['Shadow Council', 2, 1],
		['Summon Rylan Olliven', 3, 2],
		['Thieves Guild', 2, 1],
		['Traitorous Friend', 3, 1]]],
	['Raging Infection', [
		['Affliction Aura', 2, 2],
		['Envenom', 2, 1],
		['Fetid Stench', 2, 1],
		['Infected', 2, 1],
		['Mass Mutation', 2, 1],
		['Plague Release', 0, 1],
		['Summon Bolgoreth', 3, 2],
		['Virulent Cloud', 4, 1],
		['Weakened Spirit', 3, 1],
		['Weakness Within', 2, 2]]],
	['Seeds Of Betrayal', [
		['Always Prepared', 2, 1],
		['False Friends', 3, 2],
		['Meticulous Planning', 4, 1],
		['Nefarious Power', 2, 1],
		['Rush Of Power', 2, 1],
		['Scrying And Plotting', 1, 3],
		['Sole Purpose', 0, 0],
		['Summon Zachareth', 3, 2],
		['Trouble On The Road', 3, 2],
		['Two-Pronged Gambit', 2, 1]]],
	['Silent Protector', [
		['Brethren', 0, 1],
		['Curative Spirit', 2, 1],
		['Diplomatic', 1, 1],
		['Oath Of Silence', 3, 1],
		['Pacify', 2, 1],
		['Pity The Weak', 2, 1],
		['Power In Mourning', 3, 1],
		['Shared Burdens', 3, 1],
		['Summon Serena', 3, 2],
		['Travelers Rest', 3, 2]]],
	['Skulduggery', [
		['Bait And Switch', 3, 2],
		['Concealment', 2, 0],
		['Covetous', 2, 1],
		['Cursed Treasure', 3, 0],
		['Distraction', 2, 2],
		['Foiled Again', 2, 1],
		['Guarded Treasure', 3, 0],
		['Petty Theft', 0, 1],
		['Slippery', 2, 1],
		['Summon Raythen', 3, 2]]],
	['Tangled Web', [
		['Embrace Darkness', 2, 1],
		['Entangling Weave', 2, 1],
		['Feral Instincts', 2, 1],
		['Hidden Predator', 2, 1],
		['Natural Camouflage', 0, 1],
		['Savage Exploitation', 4, 2],
		['Solitary Prey', 3, 1],
		['Summon Queen Ariad', 3, 2],
		['Unsafe Passage', 2, 2],
		['Web Of Deception', 2, 1]]],
	['The Fallen Elite', [
		['Armor Of Darkness', 0, 1],
		['Dark Champions', 3, 3],
		['Fight in Formation', 3, 1],
		['Vengeful Resolve', 3, 1],
		['Knight Training', 3, 1],
		['Refuse To Die', 4, 3],
		['Summon Alric', 3, 2],
		['Trial Of Knighthood', 2, 1],
		['Unkillable', 3, 2],
		['Veteran Council', 2, 1]]],
	['Twisted Soul', [
		['Bitter Rage', 2, 1],
		['Delusional Path', 3, 1],
		['Desolation', 2, 2],
		['Faithful Guardian', 4, 0],
		['Possessive Nature', 1, 0],
		['Summon Skarn', 3, 2],
		['Thick Scars', 2, 1],
		['Thunderous Fall', 2, 1],
		['Unknown Origin', 3, 0],
		['What Doesnt Kill', 0, 1]]],
	['Unseen Legions', [
		['Always Watching', 4, 1],
		['Envious Swarm', 2, 1],
		['Flee The Light', 2, 1],
		['Ignoble Sacrifice', 2, 1],
		['In Every Shadow', 2, 0],
		['Infestation', 2, 1],
		['Initiation', 3, 1],
		['Into The Shadows', 3, 1],
		['Mouths To Feed', 0, 0],
		['Summon Verminous', 3, 2]]],
	['Unstable Forces', [
		['Descend To Madness', 3, 1],
		['Explosive Fall', 2, 1],
		['Love Of Chaos', 3, 1],
		['Mortal Coil', 2, 2],
		['Onslaught', 3, 2],
		['Pariah', 2, 0],
		['Power And Sacrifice', 3, 0],
		['Soul Ensnare', 3, 1],
		['Summon Tristayne Olliven', 3, 2],
		['Wild Energy', 0, 0]]],
	['Eternal Agony', [
		['Branded', 2, 1],
		['Idle Hands', 3, 1],
		['If Looks Could Kill', 1, 2],
		['Long Suffering', 1, 1],
		['Make No Excuse', 1, 1],
		['Pins And Needles', 2, 0],
		['Sadist', 3, 2],
		['Spite', 0, 1],
		['Summon Zarihell', 3, 2],
		['Time On The Rack', 3, 1]]],
	['First Legion', [
		['Camaraderie', 2, 1],
		['Defensive Position', 3, 2],
		['Fealty', 2, 1],
		['Loyalty Rewarded', 4, 1],
		['Retribution', 2, 1],
		['Rise to the Challenge', 4, 0],
		['Strength in Numbers', 0, 1],
		['Swarming Tide', 2, 1],
		['Summon Ardus IxErebus', 3, 2],
		['Threatening Masses', 2, 1]]],
	['Vital Essence', [
		['Bleed it out', 3, 0],
		['Broken', 0, 0],
		['Dangerous Knowledge', 2, 0],
		['Invest in the Flesh', 3, 1],
		['Last Words', 1, 1],
		['No Interference', 2, 1],
		['Plague of the Mind', 2, 1],
		['Slow Bones', 3, 1],
		['Summon Kyndrithul', 3, 2],
		['Worn Down', 3, 1]]]
];

var SHOWING_CLASSES = [];
SHOWING_CLASSES[1] = 'showOneCell';
SHOWING_CLASSES[2] = 'showTwoCells';
SHOWING_CLASSES[3] = 'showThreeCells';

var conditionNumber = 1;
var relicNumber = 1;
var auraNumber = 1;

var monsterNumber = 1;
var sackNumber = 1;

var config = {};

var defaultConfig = 'eyJtb25zdGVycyI6W3sidGl0bGUiOiJFdHRpbiIsIm1hc3RlciI6dHJ1ZSwieCI6IjEwIiwieSI6IjAiLCJ2ZXJ0aWNhbCI6ZmFsc2UsImhwIjoiMTYiLCJjb25kaXRpb25zIjpbXX0seyJ0aXRsZSI6IkV0dGluIiwibWFzdGVyIjpmYWxzZSwieCI6IjEwIiwieSI6IjIiLCJ2ZXJ0aWNhbCI6ZmFsc2UsImhwIjoiNSIsImNvbmRpdGlvbnMiOltdfSx7InRpdGxlIjoiR29ibGluIEFyY2hlciIsIm1hc3RlciI6dHJ1ZSwieCI6IjEzIiwieSI6IjQiLCJ2ZXJ0aWNhbCI6ZmFsc2UsImhwIjoiNCIsImNvbmRpdGlvbnMiOltdfSx7InRpdGxlIjoiR29ibGluIEFyY2hlciIsIm1hc3RlciI6ZmFsc2UsIngiOiIxNCIsInkiOiI0IiwidmVydGljYWwiOmZhbHNlLCJocCI6IjIiLCJjb25kaXRpb25zIjpbXX0seyJ0aXRsZSI6IkdvYmxpbiBBcmNoZXIiLCJtYXN0ZXIiOmZhbHNlLCJ4IjoiMTQiLCJ5IjoiNSIsInZlcnRpY2FsIjpmYWxzZSwiaHAiOiIyIiwiY29uZGl0aW9ucyI6W119LHsidGl0bGUiOiJHb2JsaW4gQXJjaGVyIiwibWFzdGVyIjpmYWxzZSwieCI6IjE0IiwieSI6IjYiLCJ2ZXJ0aWNhbCI6ZmFsc2UsImhwIjoiMiIsImNvbmRpdGlvbnMiOltdfSx7InRpdGxlIjoiR29ibGluIEFyY2hlciIsIm1hc3RlciI6ZmFsc2UsIngiOiIxNCIsInkiOiI3IiwidmVydGljYWwiOmZhbHNlLCJocCI6IjIiLCJjb25kaXRpb25zIjpbXX1dLCJoZXJvMSI6eyJ0aXRsZSI6IkFzaHJpYW4iLCJ4IjoiMTIiLCJ5IjoiOCIsImhwIjoiMTAiLCJzdGFtaW5hIjoiNCIsImNsYXNzTmFtZSI6IkRpc2NpcGxlIiwiZmVhdFVzZWQiOmZhbHNlLCJza2lsbHMiOltbIkFybW9yIE9mIEZhaXRoIixmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZV0sWyJCbGVzc2VkIFN0cmlrZSIsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2VdLFsiQ2xlYW5zaW5nIFRvdWNoIixmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZV0sWyJEaXZpbmUgRnVyeSIsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2VdLFsiSG9seSBQb3dlciIsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2VdLFsiUHJheWVyIE9mIEhlYWxpbmciLHRydWUsZmFsc2UsZmFsc2UsZmFsc2VdLFsiUHJheWVyIE9mIFBlYWNlIixmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZV0sWyJSYWRpYW50IExpZ2h0IixmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZV0sWyJUaW1lIE9mIE5lZWQiLGZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlXV0sIml0ZW1zIjp7ImhhbmQiOiJJcm9uIE1hY2UiLCJoYW5kMiI6Ildvb2RlbiBTaGllbGQiLCJhcm1vciI6IiIsIml0ZW0iOiIiLCJpdGVtMiI6IiJ9LCJzYWNrIjpbXSwiY29uZGl0aW9ucyI6W119LCJoZXJvMiI6eyJ0aXRsZSI6IlN5bmRyYWVsIiwieCI6IjEyIiwieSI6IjkiLCJocCI6IjEyIiwic3RhbWluYSI6IjQiLCJjbGFzc05hbWUiOiJLbmlnaHQiLCJmZWF0VXNlZCI6ZmFsc2UsInNraWxscyI6W1siQWR2YW5jZSIsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2VdLFsiQ2hhbGxlbmdlIixmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZV0sWyJEZWZlbmQiLGZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlXSxbIkRlZmVuc2UgVHJhaW5pbmciLGZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlXSxbIkd1YXJkIixmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZV0sWyJJbnNwaXJhdGlvbiIsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2VdLFsiT2F0aCBPZiBIb25vciIsdHJ1ZSxmYWxzZSxmYWxzZSxmYWxzZV0sWyJTaGllbGQgU2xhbSIsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2VdLFsiU3RhbHdhcnQiLGZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlXV0sIml0ZW1zIjp7ImhhbmQiOiJJcm9uIExvbmdzd29yZCIsImhhbmQyIjoiV29vZGVuIFNoaWVsZCIsImFybW9yIjoiIiwiaXRlbSI6IiIsIml0ZW0yIjoiIn0sInNhY2siOltdLCJjb25kaXRpb25zIjpbXX0sImhlcm8zIjp7InRpdGxlIjoiTGVvcmljIG9mIHRoZSBCb29rIiwieCI6IjEyIiwieSI6IjEwIiwiaHAiOiI4Iiwic3RhbWluYSI6IjUiLCJjbGFzc05hbWUiOiJSdW5lbWFzdGVyIiwiZmVhdFVzZWQiOmZhbHNlLCJza2lsbHMiOltbIkJyZWFrIFRoZSBSdW5lIixmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZV0sWyJFeHBsb2RpbmcgUnVuZSIsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2VdLFsiR2hvc3QgQXJtb3IiLGZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlXSxbIkluc2NyaWJlIFJ1bmUiLGZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlXSxbIklyb24gV2lsbCIsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2VdLFsiUXVpY2sgQ2FzdGluZyIsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2VdLFsiUnVuZSBNYXN0ZXJ5IixmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZV0sWyJSdW5pYyBLbm93bGVkZ2UiLHRydWUsZmFsc2UsZmFsc2UsZmFsc2VdLFsiUnVuaWMgU29yY2VyeSIsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2VdXSwiaXRlbXMiOnsiaGFuZCI6IkFyY2FuZSBCb2x0IiwiaGFuZDIiOiIiLCJhcm1vciI6IiIsIml0ZW0iOiIiLCJpdGVtMiI6IiJ9LCJzYWNrIjpbXSwiY29uZGl0aW9ucyI6W119LCJoZXJvNCI6eyJ0aXRsZSI6IkphaW4gRmFpcndvb2QiLCJ4IjoiMTIiLCJ5IjoiMTEiLCJocCI6IjgiLCJzdGFtaW5hIjoiNSIsImNsYXNzTmFtZSI6IldpbGRsYW5kZXIiLCJmZWF0VXNlZCI6ZmFsc2UsInNraWxscyI6W1siQWNjdXJhdGUiLGZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlXSxbIkJsYWNrIEFycm93IixmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZV0sWyJCb3cgTWFzdGVyeSIsZmFsc2UsZmFsc2UsZmFsc2UsZmFsc2VdLFsiRGFuZ2VyIFNlbnNlIixmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZV0sWyJFYWdsZSBFeWVzIixmYWxzZSxmYWxzZSxmYWxzZSxmYWxzZV0sWyJGaXJzdCBTdHJpa2UiLGZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlXSxbIkZsZWV0IE9mIEZvb3QiLGZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlXSxbIk5pbWJsZSIsdHJ1ZSxmYWxzZSxmYWxzZSxmYWxzZV0sWyJSdW5uaW5nIFNob3QiLGZhbHNlLGZhbHNlLGZhbHNlLGZhbHNlXV0sIml0ZW1zIjp7ImhhbmQiOiJZZXcgU2hvcnRib3ciLCJoYW5kMiI6IiIsImFybW9yIjoiIiwiaXRlbSI6IiIsIml0ZW0yIjoiIn0sInNhY2siOltdLCJjb25kaXRpb25zIjpbXX0sInRpbGVzIjpbeyJ0aXRsZSI6IjgiLCJzaWRlIjoiQSIsIngiOiI2IiwieSI6IjAiLCJhbmdsZSI6IjE4MCJ9LHsidGl0bGUiOiJFbmQiLCJzaWRlIjoiQSIsIngiOiI1IiwieSI6IjEiLCJhbmdsZSI6IjkwIn0seyJ0aXRsZSI6IjE2Iiwic2lkZSI6IkEiLCJ4IjoiNiIsInkiOiI0IiwiYW5nbGUiOiIwIn0seyJ0aXRsZSI6IjEyIiwic2lkZSI6IkEiLCJ4IjoiMSIsInkiOiIzIiwiYW5nbGUiOiIyNzAifSx7InRpdGxlIjoiRXhpdCIsInNpZGUiOiJBIiwieCI6IjIiLCJ5IjoiMSIsImFuZ2xlIjoiOTAifSx7InRpdGxlIjoiMjYiLCJzaWRlIjoiQSIsIngiOiIxMCIsInkiOiI0IiwiYW5nbGUiOiIyNzAifSx7InRpdGxlIjoiOSIsInNpZGUiOiJBIiwieCI6IjYiLCJ5IjoiOCIsImFuZ2xlIjoiMCJ9LHsidGl0bGUiOiJFbmQiLCJzaWRlIjoiQSIsIngiOiI1IiwieSI6IjkiLCJhbmdsZSI6IjkwIn0seyJ0aXRsZSI6IkVudHJhbmNlIiwic2lkZSI6IkEiLCJ4IjoiMTAiLCJ5IjoiOSIsImFuZ2xlIjoiMTgwIn0seyJ0aXRsZSI6IkVuZCIsInNpZGUiOiJBIiwieCI6IjEzIiwieSI6IjUiLCJhbmdsZSI6IjI3MCJ9XSwiZG9vcnMiOltdLCJ4cyI6W10sImFsbGllcyI6W10sImZhbWlsaWFycyI6W10sIm9iamVjdGl2ZXMiOlt7InRpdGxlIjoiU2VhcmNoIiwieCI6IjEiLCJ5IjoiNyJ9LHsidGl0bGUiOiJTZWFyY2giLCJ4IjoiNSIsInkiOiI5In0seyJ0aXRsZSI6IlNlYXJjaCIsIngiOiIxMyIsInkiOiI1In0seyJ0aXRsZSI6IlNlYXJjaCIsIngiOiI1IiwieSI6IjEifV0sIm92ZXJsb3JkIjp7ImNhcmRzIjpbXX0sImxpZXV0ZW5hbnRzIjpbXSwiY3VycmVudEFjdCI6IkkiLCJtYXBXaWR0aCI6NDAsIm1hcEhlaWdodCI6NTB9';
var CurrentAct = "I"; // values I or II
var ALL_ACTS = 'ActI ActII'

var CAMPAIGNS = [
	['The Shadow Rune', 'TSR'],
	['Heirs of Blood', 'Hob'],
	['Lair of the Wyrm', 'LotW'],
	['Labyrinth of Ruin', 'LoR'],
	['The Trollfens', 'TF'],
	['Shadow of Nerekhall', 'SoN'],
	['Manor of Ravens', 'MoR'],
	['Mists of Bilehall', 'MoB'],
	['The Chains That Rust', 'CTR'],
	['H&M Collections', 'HM']
	//,['Custom','Custom']
];
var ALL_CAMPAIGNS_CLASSES = ''
for (var i = 0; i < CAMPAIGNS.length; i++) {
	ALL_CAMPAIGNS_CLASSES += CAMPAIGNS[i][1] + ' ';
}

var MAP_HASES_LIST = [];


var monsterList = [];
var mapObjects = [];
//var conditionsToShow = {};

var overlordRelicNumber = 0;


//Initialize Global Data (Mainly LineClass)
var tileLine = new LineClass('tile', 'tile', 'tiles', '');
tileLine.needSideList = true;
tileLine.needCoordinates = true;
tileLine.XYBase = '1x1';		//DefaultValue
tileLine.needAngleList = true;
tileLine.needRemoveButton = true;
tileLine.AllData = MAP_TILES;		//always formated the same way : name, width, height, left, top

var doorLine = new LineClass('door', 'door', 'doors', '');
doorLine.needCoordinates = true;
doorLine.XYBase = '1x2';		//DefaultValue
doorLine.needOpenedCheckbox = true;
doorLine.needRemoveButton = true;
doorLine.AllData = DOORS;

var xMarkLine = new LineClass('X Mark', 'xMark', 'xMarks', '');
xMarkLine.needCoordinates = true;
xMarkLine.XYBase = '1x1';		//DefaultValue
xMarkLine.needRemoveButton = true;
xMarkLine.AllData = BLOCKS;

var monsterLine = new LineClass('monster', 'monster', 'monsters', 'RemoveLine_Monster(this);');
monsterLine.needCoordinates = true;
monsterLine.XYBase = '1x1';		//DefaultValue
monsterLine.needCustomInput[0][0] = true;
monsterLine.needAddTokenButton = true;
monsterLine.needAddRelicButton = true;
monsterLine.needAddAuraButton = true;
monsterLine.needRemoveButton = true;
monsterLine.mapData.Layer = "figures";
monsterLine.mapData.zIndex = 2;
monsterLine.mapData.DisplayCI0 = true;
monsterLine.AllData = MONSTERS;

var lieutenantLine = new LineClass('lieutenant', 'lieutenant', 'lieutenants', 'RemoveLine_Lieutenant(this);');
lieutenantLine.needCoordinates = true;
lieutenantLine.XYBase = '1x1';		//DefaultValue
lieutenantLine.needCustomInput[0][0] = true;
lieutenantLine.needAddTokenButton = true;
lieutenantLine.needAddRelicButton = true;
lieutenantLine.needAddAuraButton = true;
lieutenantLine.needRemoveButton = true;
lieutenantLine.UsesMainCommonImages = true;
lieutenantLine.mapData.Layer = "figures";
lieutenantLine.mapData.zIndex = 2;
lieutenantLine.mapData.DisplayCI0 = true;
lieutenantLine.AllData = LIEUTENANTS;

var agentLine = new LineClass('agent', 'agent', 'agents', 'RemoveLine_Agent(this);');
agentLine.needCoordinates = true;
agentLine.XYBase = '1x1';		//DefaultValue
agentLine.needCustomInput[0][0] = true;
agentLine.needAddTokenButton = true;
agentLine.needAddAuraButton = true;
agentLine.needRemoveButton = true;
agentLine.UsesMainCommonImages = true;
agentLine.mapData.Layer = "figures";
agentLine.mapData.zIndex = 2;
agentLine.mapData.DisplayCI0 = true;
agentLine.AllData = LIEUTENANTS;

var heroLine = new LineClass('hero', 'hero', 'heroes', 'RemoveLine_Hero(this);');
heroLine.needCoordinates = true;
heroLine.XYBase = '1x1';		//DefaultValue
heroLine.needCustomInput[0][0] = true;
heroLine.needCustomInput[1][0] = true;
heroLine.needAddTokenButton = true;
heroLine.needAddAuraButton = true;
heroLine.needRemoveButton = true;
heroLine.mapData.Layer = "figures";
heroLine.mapData.zIndex = 3;
heroLine.mapData.DisplayCI0 = true;
heroLine.mapData.SpecificClassZeroCI0 = 'secondary';
heroLine.mapData.DisplayCI1 = true;
heroLine.AllData = HEROES;

var allyLine = new LineClass('ally', 'ally', 'allies', '');
allyLine.needCoordinates = true;
allyLine.XYBase = '1x1';		//DefaultValue
allyLine.needCustomInput[0][0] = true;
//allyLine.needCustomInput[0][1] = true; // Using Add Button
allyLine.needAddTokenButton = true;
allyLine.needAddAuraButton = true;
allyLine.needRemoveButton = true;
allyLine.UsesMainCommonImages = true;
allyLine.mapData.Layer = "figures";
allyLine.mapData.zIndex = 2;
allyLine.mapData.DisplayCI0 = true;
allyLine.AllData = ALLIES;

var familiarLine = new LineClass('familiar', 'familiar', 'familiars', 'RemoveLine_Familiar(this);');
familiarLine.needCoordinates = true;
familiarLine.XYBase = '1x1';		//DefaultValue
familiarLine.needCustomInput[0][0] = true;
familiarLine.needCustomInput[0][1] = true; // Using Add Button
familiarLine.needAddTokenButton = true;
familiarLine.needRemoveButton = true;
familiarLine.mapData.Layer = "figures";
familiarLine.mapData.zIndex = 1;
familiarLine.mapData.DisplayCI0 = true;
familiarLine.AllData = FAMILIARS;

var villagerLine = new LineClass('villager', 'villager', 'villagers', '');
villagerLine.needCoordinates = true;
villagerLine.XYBase = '1x1';		//DefaultValue
villagerLine.needCustomInput[0][0] = true;
villagerLine.needCustomInput[0][1] = true; // Using Add Button
villagerLine.needAddTokenButton = true;
villagerLine.needRemoveButton = true;
villagerLine.mapData.Layer = "figures";
villagerLine.mapData.zIndex = 1;
villagerLine.mapData.DisplayCI0 = true;
villagerLine.AllData = VILLAGERS;

var maptokenLine = new LineClass('maptoken', 'maptoken', 'maptokens', '');
maptokenLine.needCoordinates = true;
maptokenLine.XYBase = '1x1';		//DefaultValue
maptokenLine.needCustomInput[0][0] = true;
maptokenLine.needCustomInput[0][1] = true; // Using Add Button
maptokenLine.needRemoveButton = true;
maptokenLine.mapData.Layer = "figures";
maptokenLine.mapData.zIndex = 0;
maptokenLine.mapData.DisplayCI0 = true;
maptokenLine.AllData = MAPTOKENS;

