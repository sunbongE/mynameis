import React, { useState } from 'react';
import Loading from '../../modules/roomModules/Loading';
import MeetingRoom from '../../modules/roomModules/MeetingRoom';
import MeetingReady from '../../modules/roomModules/MeetingReady';

const Room = () => {
  const [state, setState] = useState('loading');

  return (
    <>
      {state === 'loading' && <Loading state={state} setState={setState} />}
      {state.includes('step') && <MeetingRoom state={state} setState={setState} />}
      {state.includes('ready') && <MeetingReady state={state} setState={setState} />}
      {state === '' && <div>끝났대...</div>}
    </>
  );
};

export default Room;
