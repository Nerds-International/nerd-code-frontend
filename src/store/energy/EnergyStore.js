import { makeAutoObservable } from 'mobx';

class EnergyStore {
    energy = 2;
    maxEnergy = 10;
    refillRate = 1;
    interval = null;

    constructor() {
        makeAutoObservable(this);
        this.startRefill();
    }

    startRefill() {
        this.interval = setInterval(() => {
            if (this.energy < this.maxEnergy) {
                this.energy = Math.min(this.energy + this.refillRate, this.maxEnergy);
            }
        }, 5000);
    }

    stopRefill() {
        clearInterval(this.interval);
    }

    setEnergy(newEnergy) {
        if (newEnergy >= 0 && newEnergy <= this.maxEnergy) {
            this.energy = newEnergy;
        } else {
            throw new Error('out of bounds');
        }
    }
}

const energyStore = new EnergyStore();
export default energyStore;
