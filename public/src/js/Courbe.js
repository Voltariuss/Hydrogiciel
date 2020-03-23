class Courbe {
 
    //attributs
    donnees;
    label;
    id;
    valeurDebutX;
    valeurFinX;

    constructor(id, label, valeurDebutX, valeurFinX) {
        this.id = id;
        this.donnees = [];
        this.label = label;
        this.valeurDebutX = valeurDebutX;
        this.valeurFinX = valeurFinX;
        
    }

    SetDonnee(data)
    {
        this.donnees = [];
        for(var i=0; i<data.length;i+=2)
        {
            this.donnees.push(new Donnee(data[i], data[i+1]));
        }
        console.log(this.donnees);
    }

    ConcatDonnee(data)
    {
        for(var i=0; i<data.length;i+=2)
        {
            this.donnees.push(new Donnee(data[i], data[i+1]));
        }
    }

    GetListeValeur()
    {
        var res = []
        for(var i=0; i<this.donnees.length;i++)
        {
            res.push(this.donnees[i].GetValeurs());
        }

        return res;
    }

    GetListeDate()
    {
        var res = []
        for(var i=0; i<this.donnees.length;i++)
        {
            res.push(this.donnees[i].GetDate());
        }

        return res;
    }

}

class Donnee {
    // attributs
	date;
	valeurs;

	constructor (date, valeur) {
		this.date = date;
		this.valeurs = valeur;
	}

	GetDate() {return (this.date);}
	GetValeurs() {return (this.valeurs);}
}