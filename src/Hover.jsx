import React, { useState } from 'react';

// Replaces the design tool's style-hover attribute: merges `hover` styles while the pointer is over the element.
export default function Hover({ as: Tag = 'div', style, hover, onMouseEnter, onMouseLeave, ...rest }) {
  const [on, setOn] = useState(false);
  return (
    <Tag
      {...rest}
      style={on ? { ...style, ...hover } : style}
      onMouseEnter={(e) => { setOn(true); onMouseEnter && onMouseEnter(e); }}
      onMouseLeave={(e) => { setOn(false); onMouseLeave && onMouseLeave(e); }}
    />
  );
}
