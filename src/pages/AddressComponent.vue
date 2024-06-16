<template>
  <div>
    <input type="text" v-model="codePostal">
  </div>
  <div class="dropdown">
    <input class="dropdown-input"
      @focus="showOptions()"
      @blur="exit()"
      @keyup="keyMonitor"
      v-model="searchFilter"
      :disabled="disabled"
      :placeholder="placeholder" />

    <div class="dropdown-content"
      v-show="optionsShown">
      <div
        class="dropdown-item"
        @mousedown="selectOption(option)"
        v-for="(option, index) in filteredOptions"
        :key="index">
          {{ option.properties.label || '-' }}
      </div>
    </div>
  </div>

</template>

<script>
import axios from 'axios';
export default {
  name: 'AddressComponent',
  data() {
    return {
      name: 'dropdown', 
      placeholder: 'Please select an option',
      disabled: false,
      maxItem: 15,
      selected: {},
      options: [],
      optionsShown: false,
      searchFilter: '',
      codePostal: ''
    }
  },
  computed: {
    filteredOptions() {
      return this.options.slice(0, this.maxItem);
    }
  },
  methods: {
    selectOption(option) {
      this.selected = option;
      this.optionsShown = false;
      this.searchFilter = this.selected.properties.label;
      this.$emit('selected', this.selected);
    },
    showOptions() {
      if (!this.disabled) {
        this.searchFilter = '';
        this.optionsShown = true;
      }
    },
    exit() {
      if (!this.selected.properties || !this.selected.properties.label) {
        this.selected = {};
        this.searchFilter = '';
      } else {
        this.searchFilter = this.selected.properties.label;
      }
      this.optionsShown = false;
    },
    keyMonitor(event) {
      if (event.key === "Enter" && this.filteredOptions[0]) {
        this.selectOption(this.filteredOptions[0]);
      } else {
        this.fetchSuggestions();
      }
    },
    fetchSuggestions() {
      if (this.searchFilter.length >= 3) {
        const url = `https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(this.searchFilter)}&limit=15`;
        axios.get(url)
          .then(response => {
            this.options = response.data.features;
          })
          .catch(error => {
            console.error('Erreur lors de la récupération des données', error);
          });
      } else {
        this.options = [];
      }
    }
  },
  watch: {
    searchFilter() {
      this.fetchSuggestions();
    }
  }
};
</script>

<style scoped>
.dropdown {
  position: relative;
  display: block;
  margin: auto;
}

.dropdown-input {
  background: #fff;
  cursor: pointer;
  border: 1px solid #e7ecf5;
  border-radius: 3px;
  color: #333;
  display: block;
  font-size: .8em;
  padding: 6px;
  min-width: 250px;
  max-width: 250px;
}

.dropdown-input:hover {
  background: #f8f8fa;
}

.dropdown-content {
  position: absolute;
  background-color: #fff;
  min-width: 248px;
  max-width: 248px;
  max-height: 248px;
  border: 1px solid #e7ecf5;
  box-shadow: 0px -8px 34px 0px rgba(0,0,0,0.05);
  overflow: auto;
  z-index: 1;
}

.dropdown-item {
  color: black;
  font-size: .7em;
  line-height: 1em;
  padding: 8px;
  text-decoration: none;
  display: block;
  cursor: pointer;
}

.dropdown-item:hover {
  background-color: #e7ecf5;
}

.dropdown:hover .dropdown-content {
  display: block;
}
</style>
