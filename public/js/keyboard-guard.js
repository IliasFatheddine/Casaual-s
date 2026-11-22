addEventListener('keydown',e=>{if(/^(INPUT|TEXTAREA)$/.test((e.target||{}).tagName)&&[' ','ArrowUp','ArrowDown','PageUp','PageDown','Home','End'].includes(e.key))e.stopImmediatePropagation()},true)
