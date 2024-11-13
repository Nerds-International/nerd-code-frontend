import energyStore from './EnergyStore';

jest.useFakeTimers();

describe('EnergyStore', () => {
    beforeEach(() => {
        energyStore.stopRefill();
        energyStore.setEnergy(2);
    });

    afterAll(() => {
        energyStore.stopRefill();
    });

    test('initial energy should be 2', () => {
        expect(energyStore.energy).toBe(2);
    });

    test('energy should refill over time', () => {
        energyStore.startRefill();
        jest.advanceTimersByTime(5000);
        expect(energyStore.energy).toBe(3);
        energyStore.stopRefill();
    });

    test('setEnergy should update energy', () => {
        energyStore.setEnergy(5);
        expect(energyStore.energy).toBe(5);
    });

    test('setEnergy should throw an error if energy is out of bounds', () => {
        expect(() => energyStore.setEnergy(11)).toThrow('out of bounds');
        expect(() => energyStore.setEnergy(-1)).toThrow('out of bounds');
    });

    test('stopRefill should stop the refill interval', () => {
        energyStore.startRefill();
        energyStore.stopRefill();
        const initialEnergy = energyStore.energy;
        jest.advanceTimersByTime(5000);
        expect(energyStore.energy).toBe(initialEnergy);
    });
});
