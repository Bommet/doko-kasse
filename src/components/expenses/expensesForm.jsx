import { Component } from 'react';
import Combobox from '@salesforce/design-system-react/components/combobox';
import Input from '@salesforce/design-system-react/components/input';

import { LIST_OPTIONS } from 'constants/semester';

export default class ExpensesForm extends Component {
  state = {
    item: {
      art: '',
      semester: LIST_OPTIONS[LIST_OPTIONS.length - 1].id,
      wert: 0
    }
  };

  get semesterLabel() {
    return LIST_OPTIONS.find(option => option.id === this.state.item.semester)?.label;
  }

  componentDidMount() {
    if (this.props.presetExpense) {
      this.setState({ item: { ...this.props.presetExpense } });
    }
  }

  addValueToItem = (key, value) => {
    this.setState(state => ({ item: { ...state.item, [key]: value } }));
  };

  handleKindChange = (event, { value }) => {
    this.addValueToItem('art', value);
  };

  handleValueChange = (event, { value }) => {
    this.addValueToItem('wert', value ? +value : '');
  };

  handleComboboxSelect = (_, { selection }) => {
    const [selectedItem] = selection;
    this.addValueToItem('semester', selectedItem.id);
  };

  render = () => (
    <section className="slds-var-p-around_small slds-grid slds-grid_pull-padded slds-wrap">
      <div className="slds-col slds-col_padded slds-size_full slds-form-element slds-var-m-bottom_small">
        <Input
          id="art"
          label="Beschreibung"
          placeholder="Abschluss (WS1819)"
          type="text"
          required
          value={this.state.item.art}
          onChange={this.handleKindChange}
        />
      </div>

      <div className="slds-col slds-col_padded  slds-size_full slds-large-size_1-of-2 slds-form-element slds-var-m-bottom_small">
        <Input
          id="wert"
          label="Preis"
          type="number"
          fixedTextLeft="€"
          step={0.1}
          required
          value={this.state.item.wert}
          onChange={this.handleValueChange}
        />
      </div>

      <div className="slds-col slds-col_padded slds-size_full slds-large-size_1-of-2 slds-form-element slds-var-m-bottom_small">
        <Combobox
          labels={{ label: 'Semester', placeholder: 'Semester auswählen' }}
          options={LIST_OPTIONS}
          required
          value={this.semesterLabel}
          events={{ onSelect: this.handleComboboxSelect }}
          id="semester"
        />
      </div>
    </section>
  );
}
