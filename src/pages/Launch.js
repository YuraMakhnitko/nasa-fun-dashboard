import { useMemo } from 'react';
import { Appear, Button, Loading, Paragraph } from 'arwes';
import Clickable from '../components/Clickable';

import { useScreenSize } from '../hooks/useScreenSize';

const Launch = (props) => {
  const screenSize = useScreenSize();
  const inputStyle = {
    fontFamily: 'Titillium Web',
    outlineColor: '#26dafd',
    fontSize: '16px',
    borderColor: 'transparent',
    borderRadius: '2px',
  };

  const selectorBody = useMemo(() => {
    return props.planets?.map((planet) => (
      <option value={planet.keplerName} key={planet.keplerName}>
        {planet.keplerName}
      </option>
    ));
  }, [props.planets]);

  const today = new Date().toISOString().split('T')[0];

  return (
    <Appear id="launch" animate show={props.entered}>
      <Paragraph>
        Schedule a mission launch for interstellar travel to one of the Kepler
        Exoplanets.
      </Paragraph>
      <Paragraph>
        Only confirmed planets matching the following criteria are available for
        the earliest scheduled missions:
      </Paragraph>
      <ul>
        <li>Planetary radius &lt; 1.6 times Earth's radius</li>
        <li>
          Effective stellar flux &gt; 0.36 times Earth's value and &lt; 1.11
          times Earth's value
        </li>
      </ul>

      <form
        onSubmit={props.submitLaunch}
        style={{
          display: 'inline-grid',
          gridTemplateColumns: 'auto auto',
          gridGap: '10px 20px',
        }}
      >
        <label htmlFor="launch-day">
          {screenSize.width >= 470 ? 'Launch Date' : 'Date'}
        </label>
        <input
          style={inputStyle}
          type="date"
          id="launch-day"
          name="launch-day"
          min={today}
          max="2040-12-31"
          defaultValue={today}
        />
        <label htmlFor="mission-name">
          {screenSize.width >= 470 ? 'Mission Name' : 'Mission'}
        </label>
        <input
          style={inputStyle}
          type="text"
          id="mission-name"
          name="mission-name"
        />
        <label htmlFor="rocket-name">
          {screenSize.width >= 470 ? 'Rocket Type' : 'Rocket'}
        </label>
        <input
          style={inputStyle}
          type="text"
          id="rocket-name"
          name="rocket-name"
          defaultValue="Explorer IS1"
        />
        <label htmlFor="planets-selector">
          {screenSize.width >= 470 ? 'Destination Exoplanet' : 'Destination'}
        </label>
        <select
          style={inputStyle}
          id="planets-selector"
          name="planets-selector"
        >
          {selectorBody}
        </select>
        <Clickable>
          <Button
            animate
            show={props.entered}
            type="submit"
            layer="success"
            disabled={props.isPendingLaunch}
          >
            {screenSize.width >= 470 ? 'Launch Mission ✔' : 'Launch'}
          </Button>
        </Clickable>
        {props.isPendingLaunch && <Loading animate small />}
      </form>
    </Appear>
  );
};

export default Launch;
