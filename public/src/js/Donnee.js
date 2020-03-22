class Donnee {
	// attributs
	date;
	valeurs;

	constructor (date, valeur) {
		this.date = date;
		this.valeurs = [];
		this.AddValeur(valeur);
	}

	GetDate() {return (this.date);}
	GetValeurs() {return (this.valeurs);}
	GetMoyenne() {
		var moy = 0;
		for (const valeur of this.valeurs) {
			moy += valeur;
		}
		return (moy / this.valeurs.length);
	}

	AddValeur(valeur) {
		this.valeurs.push(valeur);
	}

	CompareDate(date) {
		return (this.date.getTime() == date.getTime());
	}
}

module.exports.Donnee = Donnee;