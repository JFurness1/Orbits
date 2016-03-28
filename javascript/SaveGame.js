function SaveGame()	{
	this.saveFile = undefined;

	this.checkExisting = function()	{
		if (JSON.parse(localStorage.getItem("orbitsSave")) == null)	{
			console.log("No saved game found. Welcome to the game.")
			this.saveFile = new SaveFile();
		}	else	{
			this.saveFile = JSON.parse(localStorage.getItem("orbitsSave"))
			console.log("Save File found!")
		}
	}

	this.updateSave = function(launched, passed, skipped, planMan, shipPos, toScan, background)	{
		this.saveFile.NEW = false;
		this.saveFile.launched = launched;
		this.saveFile.passed = passed;
		this.saveFile.skipped = skipped;
		this.saveFile.planetList = planMan.makePlanetSaveList();
		this.saveFile.levelType = planMan.levelType;
		this.saveFile.shipPos = shipPos.clone();
		if (planMan.mine !== undefined)	{
			this.saveFile.minePos = planMan.mine.position.clone();
		}	else 	{
			this.saveFile.minePos = undefined;
		}
		this.saveFile.toScan = toScan;
		this.saveFile.starList = background.saveToList();
		console.log(this.saveFile);

		localStorage.setItem("orbitsSave", JSON.stringify(this.saveFile));
	}

	this.resetSave = function()	{
		console.log("Resetting save file");
		this.saveFile = new SaveFile();
		localStorage.setItem("orbitsSave", JSON.stringify(this.saveFile));
	}
}

function SaveFile()	{
	this.NEW = true;
	this.launched = 0;
	this.passed = 0;
	this.skipped = 0;
	this.planetList = [];
	this.mine = undefined;
	this.shipPos = new Vector(0,0);
	this.toScan = undefined;
	this.starList = [];
}