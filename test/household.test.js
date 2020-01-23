const household = window.ui.household;

describe('Household', function() {

  describe('add', function() {
    
    beforeEach(function() {
      household.members = [];
    });

    it('should add members from object', function() {
      household.addPerson({ age: 25, relationship: 'spouse', smoker: false });
      expect(household.members.length).toBe(1); 

      household.addPerson({ age: 66, relationship: 'parent', smoker: true });
      household.addPerson({ age: 34, relationship: 'child', smoker: false });
      expect(household.members.length).toBe(3);
    });

    it('should remove members by id', function() {
      household.addPerson({ age: 25, relationship: 'spouse', smoker: false });
      expect(household.members.length).toBe(1);
      household.removePerson(0);
      expect(household.members.length).toBe(0);
    });

    it('should reject members without an age', function() {
      const result = household.addPerson({ age: '', relationship: 'spouse', smoker: false });
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Age is required and must be a number greater than 0.');
      expect(household.members.length).toBe(0);
    });

    it('should reject members with an age <= 0', function() {
      const result = household.addPerson({ age: 0, relationship: 'spouse', smoker: false });
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Age is required and must be a number greater than 0.');
      expect(household.members.length).toBe(0);
    });

    it('should reject members with non-numeric age', function() {
      const result = household.addPerson({ age: 'foo', relationship: 'spouse', smoker: false });
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Age is required and must be a number greater than 0.');
      expect(household.members.length).toBe(0);
    });

    it('should allow age as a string', function() {
      const result = household.addPerson({ age: '25', relationship: 'spouse', smoker: false });
      expect(result.valid).toBe(true);
      expect(household.members.length).toBe(1);
    });

    it('should reject members without a relationship', function() {
      const result = household.addPerson({ age: 25, relationship: '', smoker: false });
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Relationship is required.');
    });

    it('should output valid JSON', function() {
      const people = [
          { age: 25, relationship: 'spouse', smoker: false },
          { age: 66, relationship: 'parent', smoker: true },
          { age: 34, relationship: 'child', smoker: false },
          { age: 25, relationship: 'spouse', smoker: false },
          { age: 66, relationship: 'parent', smoker: true },
          { age: 34, relationship: 'child', smoker: false }
        ],
        json = JSON.stringify(people);

      people.forEach(p => household.addPerson(p));

      expect(household.toJSON()).toEqual(json);
    });

  });

});