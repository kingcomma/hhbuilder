const ui = window.ui;

describe('UI', function() {

  beforeEach(function() {
    const html = `<h1>Household builder</h1>
        <div class="builder">
            <ol class="household"></ol>
            <form>
                <div>
                    <label>Age
                        <input type="text" name="age">
                    </label>
                </div>
                <div>
                    <label>Relationship
                        <select name="rel">
                            <option value="">---</option>
                            <option value="self">Self</option>
                            <option value="spouse">Spouse</option>
                            <option value="child">Child</option>
                            <option value="parent">Parent</option>
                            <option value="grandparent">Grandparent</option>
                            <option value="other">Other</option>
                        </select>
                    </label>
                </div>
                <div>
                    <label>Smoker?
                        <input type="checkbox" name="smoker">
                    </label>
                </div>
                <div>
                    <button class="add">add</button>
                </div>
                <div>
                    <button type="submit">submit</button>
                </div>
            </form>
        </div>
        <pre class="debug"></pre>`;
    document.body.innerHTML = html;
    ui.household.members = [];
    ui.list = document.querySelector('ol.household');
    ui.form = document.forms[0];
    ui.debug = document.querySelector('.debug');
  });

  describe('add', function() {

    it('should add elements to list on render', function() {
      ui.household.addPerson({ age: 25, relationship: 'spouse', smoker: false });
      ui.render();
      expect(ui.list.querySelectorAll('li').length).toBe(1);

      ui.household.addPerson({ age: 66, relationship: 'parent', smoker: true });
      ui.household.addPerson({ age: 34, relationship: 'child', smoker: false });
      ui.render();
      expect(ui.list.querySelectorAll('li').length).toBe(3);
    });

    it('should have as many list elements as member objects', function() {
      ui.household.addPerson({ age: 25, relationship: 'spouse', smoker: false });
      ui.render();
      expect(ui.list.querySelectorAll('li').length).toBe(ui.household.members.length);
    });

    it('should show alert when age <= 0', function() {
      spyOn(window, 'alert');
      ui.form.elements['age'].value = '0';
      ui.form.elements['rel'].value = 'spouse';
      ui.add(new Event('click'));
      expect(window.alert).toHaveBeenCalledWith('Age is required and must be a number greater than 0.');
    });

    it('should show alert when no age', function() {
      spyOn(window, 'alert');
      ui.form.elements['age'].value = '';
      ui.form.elements['rel'].value = 'spouse';
      ui.add(new Event('click'));
      expect(window.alert).toHaveBeenCalledWith('Age is required and must be a number greater than 0.');
    });

    it('should alert when non-numeric age', function() {
      spyOn(window, 'alert');
      ui.form.elements['age'].value = 'foo';
      ui.form.elements['rel'].value = 'spouse';
      ui.add(new Event('click'));
      expect(window.alert).toHaveBeenCalledWith('Age is required and must be a number greater than 0.');
    });

    it('should show an alert when no relationship is selected', function() {
      spyOn(window, 'alert');
      ui.form.elements['age'].value = '6';
      ui.form.elements['rel'].value = '';
      ui.add(new Event('click'));
      expect(window.alert).toHaveBeenCalledWith('Relationship is required.');
    });

  });

  describe('remove', function() {

    it('should remove elements in list', function() {
      ui.list.addEventListener('click', ui.remove.bind(ui));

      ui.household.addPerson({ age: 25, relationship: 'spouse', smoker: false });
      ui.render();
      expect(ui.list.querySelectorAll('li').length).toBe(1);

      ui.list.querySelector('li .remove-person').click();
      expect(ui.list.querySelectorAll('li').length).toBe(0);
    });

    it('should have same number of list elements as members', function() {
      ui.list.addEventListener('click', ui.remove.bind(ui));

      ui.household.addPerson({ age: 25, relationship: 'spouse', smoker: false });
      ui.render();
      expect(ui.list.querySelectorAll('li').length).toBe(1);

      ui.list.querySelector('li .remove-person').click();
      expect(ui.list.querySelectorAll('li').length).toBe(0);
      expect(ui.list.querySelectorAll('li').length).toBe(ui.household.members.length);
    });

  });

});