import React, { useState } from 'react';
import Loading from '../../modules/roomModules/Loading';
import MeetingRoom from '../../modules/roomModules/MeetingRoom';

const Room = () => {
  const [state, setState] = useState('loading');

  return (
    <>
      {state === 'loading' && <Loading state={state} setState={setState} />}
      {state.includes('step') && <MeetingRoom state={state} setState={setState} />}
    </>
  );
};

export default Room;
