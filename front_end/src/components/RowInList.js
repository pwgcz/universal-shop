import React from "react";
import classnames from 'classnames';

export default function RowInList ({ title, content, isInline = false }) {
  return (
    <div className='row'>
      <label className={classnames('row', { 'row-inline': isInline })} htmlFor="row">{title}</label>
      <p className={classnames('row', { 'row-inline': isInline })} name="row">{content}</p>
    </div>
  );
}
