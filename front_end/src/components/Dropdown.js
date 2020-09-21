import React, { useState } from "react";
import onClickOutside from 'react-onclickoutside'

function Dropdown ({ name, children }) {
  const [open, setOpen] = useState(false);

  const toggle = () => {
    setOpen(!open);
  }
  Dropdown.handleClickOutside = () => setOpen(false);

  return (
    <div className="dropdown-conteiner">
      <div role='button'
        className='dropdown-button'
        onKeyPress={()=> toggle(!open)} onClick={()=>toggle (!open)}> {name}
      </div>
      {open && <div className='dropdown-content'>{children}</div>}
    </div>

  );
}

const clickOutsideConfig = {
  handleClickOutside: () => Dropdown.handleClickOutside,
};

export default onClickOutside(Dropdown, clickOutsideConfig);
