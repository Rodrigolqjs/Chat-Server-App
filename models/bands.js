class Bands {
    constructor() {
        this.bands = [];
    }

    addBand(band = new Band()) {
        this.bands.push(band);
    }

    getBands() {
        return this.bands;
    }

    deleteBands(id = '') {
        this.bands = this.bands.filter(band => band.id != id);
        return this.bands;
    }

    voteBand(id = '') {
        this.bands = this.bands.map(band => {
            console.log('esta es una band',band);
            console.log(id);
            console.log(band.id);
            if (band.id == id) {
                band.votes ++
                return band;
            } else {
                return band;
            }
        });
    }
}

module.exports = Bands;