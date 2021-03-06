import { useState } from 'react';
import ReportSelection from './reportSelection';
import ReportDetails from './reportDetails';
import { LIST_OPTIONS } from 'constants/semester';

import PageHeader from '@salesforce/design-system-react/components/page-header';
import Dropdown from '@salesforce/design-system-react/components/menu-dropdown';
import Icon from '@salesforce/design-system-react/components/icon';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Drawer from '@material-ui/core/Drawer';
import { useTheme } from '@material-ui/core/styles';

const SELECTION_CATEGORIES = [
  {
    id: 'gesamt',
    label: 'Gesamt'
  },
  { type: 'divider' },
  ...LIST_OPTIONS
];

const NameSwitcherDropdown = ({ onSelect }) => {
  return (
    <Dropdown
      buttonClassName="slds-button_icon-small"
      buttonVariant="icon"
      iconCategory="utility"
      iconName="down"
      align="right"
      options={SELECTION_CATEGORIES}
      onSelect={onSelect}
    />
  );
};

const ReportView = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [selectedSemester, setSelectedSemester] = useState({ id: 'gesamt', label: 'Gesamt' });

  const handleSemesterSelect = selectedItem => {
    setSelectedSemester(selectedItem);
  };

  return (
    <>
      <PageHeader
        icon={<Icon category="standard" name="report" />}
        label="Auswertungen"
        title={selectedSemester.label}
        truncate
        variant="object-home"
        className="slds-var-m-bottom_small"
        nameSwitcherDropdown={<NameSwitcherDropdown onSelect={handleSemesterSelect} />}
      />

      <div className="slds-grid">
        {isMobile ? (
          <Drawer anchor="right">
            <ReportSelection selectedSemester={selectedSemester} onSelect={handleSemesterSelect} />
          </Drawer>
        ) : (
          <div className="slds-col slds-size_4-of-12 slds-var-p-right_small">
            <ReportSelection selectedSemester={selectedSemester} onSelect={handleSemesterSelect} />
          </div>
        )}

        <div className="slds-col slds-size_1-of-1 slds-medium-size_8-of-12">
          <ReportDetails selectedSemester={selectedSemester} />
        </div>
      </div>
    </>
  );
};

export default ReportView;
