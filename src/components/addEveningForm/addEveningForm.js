import { Component } from 'react';
import Combobox from '@salesforce/design-system-react/components/combobox';
import Input from '@salesforce/design-system-react/components/input';
import DatePicker from '@salesforce/design-system-react/components/date-picker';
import { LIST_OPTIONS } from '../../constants/semester';
import { PLAYERS } from '../../constants/player';
import moment from 'moment';

export default class AddEveningForm extends Component {
  state = {
    value: ''
  };

  addOrUpdateValue = (event, { value }) => {
    const regEx = new RegExp('[0-9]*[,.][0-9]{0,2}');
    console.log(regEx.test(value));
    this.props.onItemChanged({ ...this.props.currentItem, [event.target.id]: +value });
  };

  handleDatepickerSelect = (_, { formattedDate }) => {
    this.props.onItemChanged({ ...this.props.currentItem, Datum: formattedDate });
  };

  handleComboboxSelect = (_, { selection }) => {
    this.setState({ value: selection[0].label });
    this.props.onItemChanged({ ...this.props.currentItem, semester: selection[0].id });
  };

  render = () => (
    <section className="slds-var-p-around_small slds-grid slds-grid_pull-padded slds-wrap">
      <div className="slds-col slds-col_padded slds-size_1-of-1 slds-large-size_1-of-2 slds-form-element slds-var-m-bottom_small">
        <Combobox
          labels={{ label: 'Semester', placeholder: 'Semester auswählen' }}
          options={LIST_OPTIONS}
          required
          value={this.state.value}
          events={{ onSelect: this.handleComboboxSelect }}
          id="semester"
        />
      </div>

      <div className="slds-col slds-col_padded slds-size_1-of-1 slds-large-size_1-of-2 slds-form-element slds-var-m-bottom_small">
        <DatePicker
          labels={{ label: 'Datum', placeholder: 'Datum auswählen' }}
          formatter={date => (date ? moment(date).format('YYYY-MM-DD') : '')}
          parser={dateString => moment(dateString, 'YYYY-MM-DD').toDate()}
          triggerClassName="slds-size_full"
          align="right"
          isIsoWeekday
          hasStaticAlignment
          required
          onChange={this.handleDatepickerSelect}
          id="Datum"
        />
      </div>

      {PLAYERS.map(player => (
        <div
          key={player}
          className="slds-col slds-col_padded slds-size_1-of-2 slds-form-element slds-var-m-bottom_small">
          <Input
            id={player}
            label={player}
            type="number"
            fixedTextLeft="€"
            step={0.01}
            required
            onChange={this.addOrUpdateValue}
            className="input-field"
          />
        </div>
      ))}
    </section>
  );
}
