import React, { useState } from 'react';
import MeetingWaiting from '../../modules/roomModules/MeetingWaiting';
import MeetingRoom from '../../modules/roomModules/MeetingRoom';
import MeetingReady from '../../modules/roomModules/MeetingReady';

const Room = () => {
  const [state, setState] = useState('loading');

  return (
    <>
      {state === 'loading' && <MeetingWaiting state={state} setState={setState} />}
      {state.includes('step') && <MeetingRoom state={state} setState={setState} />}
      {state.includes('ready') && <MeetingReady state={state} setState={setState} />}
      {state === '' && <div>끝났대...</div>}
    </>
  );
};

export default Room;
