import React from 'react';
import Cookies from 'js-cookie';

export default function CSRFToken() {
  const csrftoken = Cookies.get('csrftoken');

  return <input type="hidden" name="csrfmiddlewaretoken" value={csrftoken} />;
}
