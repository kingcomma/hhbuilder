(function() {

  var household,
      ui;

  household = {
    /* Props */
    members: [],

    /* Methods */
    addPerson: function (props) {
      var validation;

      // Ensure age is int
      if (props.age) {
        props.age = parseInt(props.age, 10);
      }

      validation = this.validatePerson(props);

      if (validation.valid) {
        this.members.push(props);
      }

      return validation;
    },

    removePerson: function (id) {
      this.members.splice(id, 1);
    },

    toJSON: function () {
      return JSON.stringify(this.members);
    },

    validatePerson: function (person) {
      var valid = true,
          errors = [];

      // Expect incoming age to be an integer
      if (!person.age || person.age <= 0) {
        errors.push('Age is required and must be a number greater than 0.');
        valid = false;
      }

      if (person.relationship.trim() === '') {
        errors.push('Relationship is required.');
        valid = false;
      }

      return {
        valid: valid,
        errors: errors
      }
    },
  };

  ui = {
    /* Props */
    debug: document.querySelector('.debug'),
    form: document.forms[0],
    household: household,
    list: document.querySelector('ol.household'),

    /* Methods */
    add: function (event) {
      var person = {
            age: parseInt(this.form.elements['age'].value, 10),
            relationship: this.form.elements['rel'].value,
            smoker: this.form.elements['smoker'].checked
          },
          result = this.household.addPerson(person);

      if (!result.valid) {
        this.showErrors(result.errors);
      } else {
        this.render();
        this.resetForm();
      }

      event.preventDefault();

      return false;
    },

    hideDebug: function () {
      this.debug.innerHTML = '';
      this.debug.style.display = 'none';
    },

    personToString: function (person) {
      return person.relationship + ', '
          + person.age + ', '
          + (person.smoker ? 'smoker' : 'non-smoker');
    },

    remove: function (event) {
      var parent = event.target.parentElement;

      if (event.target.className === 'remove-person') {
        this.household.removePerson(+parent.dataset.id);
        this.render();
      }
    },

    render: function () {
      this.list.innerHTML = '';

      for (var i = 0; i < this.household.members.length; i++) {
        this.list.appendChild(this.renderPerson(this.household.members[i], i));
      }

      this.hideDebug();
    },

    renderPerson: function (person, id) {
      var text = document.createTextNode(this.personToString(person)),
          remove = document.createElement('button'),
          personElement = document.createElement('li');

      remove.className = 'remove-person';
      remove.textContent = 'remove';

      personElement.dataset.id = id;
      personElement.appendChild(text);
      personElement.appendChild(remove);

      return personElement;
    },

    resetForm: function () {
      this.form.elements['age'].value = '';
      this.form.elements['rel'].value = '';
      this.form.elements['smoker'].checked = false;
    },

    showErrors: function (errors) {
      alert(errors.join("\n"));
    },

    showDebug: function (message) {
      this.debug.innerHTML = message;
      this.debug.style.display = 'block';
      this.debug.style.whiteSpace = 'pre-wrap';
    },

    submit: function (event) {
      this.showDebug(this.household.toJSON());

      event.preventDefault();

      return false;
    }
  };

  // Initialize by adding event listeners
  if (ui.form && ui.list) {
    ui.form.querySelector('button.add').addEventListener('click', ui.add.bind(ui));
    ui.form.addEventListener('submit', ui.submit.bind(ui));
    ui.list.addEventListener('click', ui.remove.bind(ui));
  }

  // For easier debugging/review
  window.ui = ui;

})();