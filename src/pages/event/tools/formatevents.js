
const formatEvents = (inEvents, outEvents) => {
  inEvents.forEach(event => {
    switch (event.time_start) {
      case '08:00':
        outEvents.splice(0, 1, event)
        break;
      case '10:10':
        outEvents.splice(1, 1, event)
        break;
      case 'noon':
        outEvents.splice(2, 1, event)
        break;
      case '14:30':
        outEvents.splice(3, 1, event)
        break;
      case '16:30':
        outEvents.splice(4, 1, event)
        break;
      case 'dusk':
        outEvents.splice(5, 1, event)
        break;
      case '19:00':
        outEvents.splice(6, 1, event)
        break;
      case 'night':
        outEvents.splice(7, 1, event)
        break;
    }
  });
  return outEvents.splice(0, 8)
}


export {
  formatEvents
}